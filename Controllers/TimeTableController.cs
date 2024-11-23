using Microsoft.AspNetCore.Mvc;
using hihihiha.Models;
using hihihiha.Context;
using hihihiha.Routers;
using Microsoft.EntityFrameworkCore;

namespace hihihiha.Controllers;

[ApiController]
[Route("timetable")]
public class TimeTableController : ControllerBase
{
    private readonly ApplicationContext _context;

    public TimeTableController(ApplicationContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<TimeTable>>> GetAllTimeTables()
    {
        var timeTables = await _context.TimeTables.ToListAsync();
        return Ok(timeTables);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TimeTable>> GetTimeTableById(int id)
    {
        var timeTable = await _context.TimeTables.FindAsync(id);
        if (timeTable == null)
        {
            return NotFound();
        }

        return Ok(timeTable);
    }

    [HttpGet("lecturer/{id}")]
    public async Task<ActionResult<List<TimeTable>>> GetTimeTablesByLecturerId(int id)
    {
        var timeTables = await _context.TimeTables.Where(t => t.LecturerId == id).ToListAsync();
        if (timeTables.Count == 0)
        {
            return NotFound();
        }

        return Ok(timeTables);
    }

    [HttpPost]
    public async Task<ActionResult> CreateTimeTable([FromBody] TimeTable? timeTable)
    {
        if (timeTable == null)
        {
            return BadRequest("TimeTable cannot be null.");
        }

        try
        {
            await _context.TimeTables.AddAsync(timeTable);
            await _context.SaveChangesAsync();
            return Created("/api/timetable", timeTable);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, $"Internal server error");
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateTimeTable([FromBody] TimeTable timeTable, int id)
    {
        try
        {
            TimeTable? existingTimeTable = await _context.TimeTables.FindAsync(id);
            if (existingTimeTable == null)
            {
                throw new Exception("TimeTable not found");
            }

            if (timeTable.RoomId != 0)
            {
                existingTimeTable.RoomId = timeTable.RoomId;
            }

            if (timeTable.ClassId != 0)
            {
                existingTimeTable.ClassId = timeTable.ClassId;
            }

            if (timeTable.LecturerId != 0)
            {
                existingTimeTable.LecturerId = timeTable.LecturerId;
            }

            if (timeTable.CampusId != 0)
            {
                existingTimeTable.CampusId = timeTable.CampusId;
            }

            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, $"Internal server error");
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteTimeTable(int id)
    {
        try
        {
            var timeTable = await _context.TimeTables.FindAsync(id);
            if (timeTable == null)
            {
                throw new Exception("TimeTable not found");
            }

            _context.TimeTables.Remove(timeTable);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, $"Internal server error");
        }
    }

    [HttpPost("generate")]
    public async Task<IActionResult> Generate()
    {
        // List<Institut> institutes = _context.Instituts.ToList();
        // List<Campus> campuses = _context.Campus.ToList();
        // List<Models.Group> groups = _context.Groups.ToList();
        // List<Lecturer> lecturers = _context.Lecturers.ToList();
        // List<Class> classes = _context.Classes.ToList();
        // List<Room> rooms = _context.Rooms.ToList();
        List<Affiliate> affiliates = _context.Affiliates.ToList();
        // List<List<TimeTable>> timeTablesByAffiliate = new List<List<TimeTable>>();
        for (int i = 0; i < affiliates.Count; i++)
        {
            int affiliationId = affiliates[i].Id;
            // var affiliateTimeTables = new RedBlackTree<TimeTable>();
            var affiliationCampuses = _context.Campus
                .Where(c => c.AffiliationId == affiliationId).ToList();
            var affiliationInstitutes = _context.Instituts.Include(institut => institut.Affiliation)
                .Where(institut => institut.AffiliationId == affiliationId).ToList();
            var affiliationGroups = _context.Groups
                .Where(g => affiliationInstitutes.Any(institut => institut.Id == g.InstitutId)).ToList();
            var affiliationLecturers = _context.Lecturers
                .Where(l => affiliationInstitutes.Any(institut => institut.Id == l.InstitutionId)).ToList();
            // var affiliationClasses = _context.Classes.Include(c => c.Specialty)
                // .Where(c => affiliationInstitutes.Any(i => i.Id == c.Specialty.InstitutId)).ToList();
            var affiliationRooms = _context.Rooms.Include(r => r.Campus)
                .Where(r => affiliationCampuses.Any(c => c.Id == r.CampusId)).ToList();
            Dictionary<Tuple<int, int>, int> targetGroupClassHoursPerWeek = new Dictionary<Tuple<int, int>, int>();
            foreach (Group group in affiliationGroups)
            {
                var groupClasses = await _context.Classes.Where(c => c.SpecialtyId == group.SpecialtyId).ToListAsync();
                foreach (Class groupClass in groupClasses)
                {
                    targetGroupClassHoursPerWeek[new Tuple<int, int>(group.Id, groupClass.Id)] =
                        groupClass.Hours / groupClass.Terms.Length;
                }
            }

            foreach (Room room in affiliationRooms)
            {
                for (int week = 0; week < 16; week++)
                {
                    Dictionary<int, int> lecturerHoursPerWeek = new Dictionary<int, int>();
                    Dictionary<Tuple<int, int>, int> groupClassHoursPerWeek = new Dictionary<Tuple<int, int>, int>();
                    foreach (Group group in affiliationGroups)
                    {
                        var groupClasses = await _context.Classes.Where(c => c.SpecialtyId == group.SpecialtyId)
                            .ToListAsync();
                        foreach (Class groupClass in groupClasses)
                        {
                            groupClassHoursPerWeek[new Tuple<int, int>(group.Id, groupClass.Id)] = 0;
                        }
                    }

                    for (int day = 0; day < 6; day++)
                    {
                        int slot = 0;
                        while (slot < 7)
                        {
                            Dictionary<int, int> groupShifts = new Dictionary<int, int>();
                            Lecturer? lecturer =
                                affiliationLecturers.FirstOrDefault(l => l.HoursPerWeek < lecturerHoursPerWeek[l.Id]);
                            if (lecturer == null)
                            {
                                break;
                            }

                            if (lecturer.HoursPerWeek < lecturerHoursPerWeek[lecturer.Id])
                            {
                                continue;
                            }

                            
                            var subjects = await _context.Classes
                                .Where(c => lecturer.ClassesId.Contains(c.SpecialtyId)).ToListAsync();
                            KeyValuePair<Tuple<int,int>, int> groupClass = groupClassHoursPerWeek.FirstOrDefault(g => g.Value < targetGroupClassHoursPerWeek[g.Key]);
                            Class? subject = subjects.FirstOrDefault(s => s.Id == groupClass.Key.Item2);
                            Group? group = affiliationGroups.FirstOrDefault(g => g.Id == groupClass.Key.Item1);
                            if (subject == null || group == null)
                            {
                                break;
                            }

                            var suitableGroups = affiliationGroups
                                .Where(g =>
                                    (subject.Terms.Contains(g.Course * 2) ||
                                     subject.Terms.Contains(g.Course * 2 - 1)) &&
                                    g.SpecialtyId == subject.SpecialtyId).ToList();

                            if (subject.SlotType == SlotTypes.Lection)
                            {
                                if (!groupShifts.ContainsKey(subject.Id))
                                {
                                    groupShifts.Add(subject.Id, 0);
                                }

                                int groupShift = groupShifts[subject.Id];
                                var timeTable = new TimeTable
                                {
                                    RoomId = room.Id,
                                    Week = week,
                                    Day = day,
                                    Slot = slot,
                                    SlotType = subject.SlotType,
                                    LecturerId = lecturer.Id,
                                    ClassId = subject.Id,
                                    GroupIds = suitableGroups.Skip(groupShift).Take(5).Select(g => g.Id).ToArray(),
                                    CampusId = affiliationCampuses[0].Id,
                                    AffiliationId = affiliates[i].Id
                                };
                                _context.TimeTables.Add(timeTable);
                                groupShifts[subject.Id] += 5;
                            }

                            if (subject.SlotType == SlotTypes.Seminar || subject.SlotType == SlotTypes.Lab)
                            {
                                var timeTable = new TimeTable
                                {
                                    RoomId = room.Id,
                                    Week = week,
                                    Day = day,
                                    Slot = slot,
                                    SlotType = subject.SlotType,
                                    LecturerId = lecturer.Id,
                                    ClassId = subject.Id,
                                    GroupIds = [group.Id],
                                    CampusId = affiliationCampuses[0].Id,
                                    AffiliationId = affiliates[i].Id
                                };
                                _context.TimeTables.Add(timeTable);
                                groupClassHoursPerWeek[new Tuple<int, int>(group.Id, subject.Id)] += 1;
                            }
                            lecturerHoursPerWeek[lecturer.Id] += 1;
                            slot++;
                        }
                    }
                }
            }
        }


        return Ok();
    }
}