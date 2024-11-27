using Microsoft.AspNetCore.Mvc;
using hihihiha.Models;
using hihihiha.Context;
using hihihiha.Routers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace hihihiha.Controllers;

[ApiController]
[Authorize(Roles = "Admin")]
[Route("timetable")]
public class TimeTableController : ControllerBase
{
    private readonly ApplicationContext _context;

    public TimeTableController(ApplicationContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<IGrouping<int, TimeTable>>>> GetAllTimeTables(int from, int to)
    {
        var timeTables = await _context.TimeTables
            .GroupBy(t => t.Day)
            .ToListAsync();
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
        // List<Institut> institutes = _context.Instituts.ToListAsync();
        // List<Campus> campuses = _context.Campus.ToListAsync();
        // List<Models.Group> groups = _context.Groups.ToListAsync();
        // List<Lecturer> lecturers = _context.Lecturers.ToListAsync();
        // List<Class> classes = _context.Classes.ToListAsync();
        // List<Room> rooms = _context.Rooms.ToListAsync();
        _context.TimeTables.RemoveRange(_context.TimeTables);
        List<Affiliate> affiliates = await _context.Affiliates.ToListAsync();
        // List<List<TimeTable>> timeTablesByAffiliate = new List<List<TimeTable>>();
        for (int i = 0; i < affiliates.Count; i++)
        {
            int affiliationId = affiliates[i].Id;
            // var affiliateTimeTables = new RedBlackTree<TimeTable>();
            var affiliationCampuses = await _context.Campus
                .Where(c => c.AffiliationId == affiliationId).ToListAsync();
            var affiliationInstitutes = await _context.Instituts.Include(institut => institut.Affiliation)
                .Where(institut => institut.AffiliationId == affiliationId).ToListAsync();
            var affiliationGroups = (await _context.Groups.ToListAsync())
                .Where(g => affiliationInstitutes.Any(institut => institut.Id == g.InstitutId));
            var affiliationLecturers = (await _context.Lecturers.ToListAsync())
                .Where(l => affiliationInstitutes.Any(institut => institut.Id == l.InstitutionId));
            var affiliationRooms = (await _context.Rooms.Include(r => r.Campus).ToListAsync())
                .Where(r => affiliationCampuses.Any(c => c.Id == r.CampusId));
            Dictionary<Tuple<int, int>, int> targetGroupClassHoursPerWeek = new Dictionary<Tuple<int, int>, int>();
            foreach (Group group in affiliationGroups)
            {
                var groupClasses = await _context.Classes.Where(c => c.SpecialtyId == group.SpecialtyId).ToListAsync();
                foreach (Class groupClass in groupClasses)
                {
                    targetGroupClassHoursPerWeek[new Tuple<int, int>(group.Id, groupClass.Id)] =
                        groupClass.Hours / (groupClass.Terms.Length*16);
                }
            }

            foreach (Room room in affiliationRooms)
            {
                Console.WriteLine($"Processing room {room.Id}");
                for (int week = 0; week < 16; week++)
                {
                    Console.WriteLine($"Processing week {week}");
                    Dictionary<int, int> lecturerHoursPerWeek = new Dictionary<int, int>();
                    foreach (Lecturer lecturer in affiliationLecturers)
                    {
                        lecturerHoursPerWeek[lecturer.Id] = 0;
                    }
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
                        Console.WriteLine($"Processing day {day}");
                        for(int slot = 0; slot < 7; slot++)
                        {
                            Console.WriteLine($"Processing slot {slot}");
                            Dictionary<int, int> groupShifts = new Dictionary<int, int>();
                            Lecturer? lecturer =
                                affiliationLecturers.FirstOrDefault(l => l.HoursPerWeek > lecturerHoursPerWeek[l.Id]);
                            if (lecturer == null)
                            {
                                Console.WriteLine("Lecturer not found");
                                break;
                            }

                            if (lecturer.HoursPerWeek < lecturerHoursPerWeek[lecturer.Id])
                            {
                                Console.WriteLine("Lecturer has no free time");
                                continue;
                            }


                            var subjects = await _context.Classes
                                .Where(c => lecturer.ClassesId.Contains(c.SpecialtyId)).ToListAsync();
                            KeyValuePair<Tuple<int, int>, int> groupClass =
                                groupClassHoursPerWeek.FirstOrDefault(
                                    g => g.Value < targetGroupClassHoursPerWeek[g.Key]);
                            if (groupClass.Key == null)
                            {
                                Console.WriteLine("Group class not found");
                                break;
                            }
                            Class? subject = subjects.FirstOrDefault(s => s.Id == groupClass.Key.Item2);
                            Group? group = affiliationGroups.FirstOrDefault(g => g.Id == groupClass.Key.Item1);
                            if (subject == null || group == null)
                            {
                                Console.WriteLine("Subject or group not found");
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

                                if (subject.Hours < week)
                                {
                                    Console.WriteLine("Subject time limit exceeded");
                                    continue;
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
                                if (subject.Hours < week)
                                {
                                    Console.WriteLine("Subject time limit exceeded");
                                    continue;
                                }

                                var timeTable = new TimeTable
                                {
                                    RoomId = room.Id,
                                    Week = week,
                                    Day = day,
                                    Slot = slot,
                                    SlotType = subject.SlotType,
                                    LecturerId = lecturer.Id,
                                    ClassId = subject.Id,
                                    GroupIds = new [] {group.Id},
                                    CampusId = affiliationCampuses[0].Id,
                                    AffiliationId = affiliates[i].Id
                                };
                                _context.TimeTables.Add(timeTable);
                                groupClassHoursPerWeek[new Tuple<int, int>(group.Id, subject.Id)] += 1;
                            }
                            lecturerHoursPerWeek[lecturer.Id] += 1;
                        }
                    }
                }
            }
        }
        _context.SaveChanges();
        return Ok(await _context.TimeTables.Take(100).ToListAsync());
    }

    [HttpGet("group/{id}")]
    public async Task<IActionResult> GetTimeTablesByGroup(int id)
    {
        var timeTables = await _context.TimeTables
            .Where(t => t.GroupIds.Contains(id))
            .ToListAsync();
        return Ok(timeTables);
    }
}