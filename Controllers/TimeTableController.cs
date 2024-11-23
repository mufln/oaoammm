using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using hihihiha.Services;
using hihihiha.Models; 
using hihihiha.Context;
using hihihiha.Utils;
using Microsoft.EntityFrameworkCore;

namespace hihihiha.Routers;

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
    public async Task<ActionResult<List<Models.TimeTable>>> GetAllTimeTables()
    {
        var timeTables = await _context.TimeTables.ToListAsync();
        return Ok(timeTables);
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<Models.TimeTable>> GetTimeTableById(int id)
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
    public async Task<ActionResult> CreateTimeTable([FromBody] Models.TimeTable? timeTable)
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
            return StatusCode(500, $"Internal server error");
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateTimeTable([FromBody] Models.TimeTable timeTable, int id)
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
            return StatusCode(500, $"Internal server error");
        }
    }

    [HttpPost("generate")]
    public async Task<IActionResult> Generate()
    {
        List<Institut> institutes = _context.Instituts.ToList();
        List<Campus> campuses = _context.Campus.ToList();
        List<Models.Group> groups = _context.Groups.ToList();
        List<Lecturer> lecturers = _context.Lecturers.ToList();
        List<Class> classes = _context.Classes.ToList();
        List<Room> rooms = _context.Rooms.ToList();
        List<Affiliate> affiliates = _context.Affiliates.ToList();
        List<List<TimeTable>> timeTablesByAffiliate = new List<List<TimeTable>>();
        for (int i = 0; i < affiliates.Count; i++)
        {
            int affiliationId = affiliates[i].Id;
            var affiliateTimeTables = new RedBlackTree<TimeTable>();
            var affiliationCampuses = _context.Campus
                .Where(c => c.AffiliationId == affiliationId).ToList();
            var affiliationInstitutes = _context.Instituts
                .Where(i => i.AffiliationId == affiliationId).ToList();
            var affiliationGroups = _context.Groups
                .Where(g => affiliationInstitutes.Any(i => i.Id == g.InstitutId)).ToList();
            var affiliationLecturers = _context.Lecturers
                .Where(l => affiliationInstitutes.Any(i => i.Id == l.institutionId)).ToList();
            var affiliationClasses = _context.Classes.Include(c => c.Specialty)
                .Where(c => affiliationInstitutes.Any(i => i.Id == c.Specialty.InstitutId)).ToList();
            var affiliationRooms = _context.Rooms.Include(r => r.Campus)
                .Where(r => affiliationCampuses.Any(c => c.Id == r.CampusId)).ToList();
            
            
        }
        

        return Ok();
    }
}