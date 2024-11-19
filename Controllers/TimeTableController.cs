using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using hihihiha.Services;
using hihihiha.Models; 
using hihihiha.Context;

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
    public ActionResult<List<Models.TimeTable>> GetAllTimeTables()
    {
        var timeTables = TimeTableProvider.GetAllTimeTables(_context);
        return Ok(timeTables);
    }
    
    [HttpGet("{id}")]
    public ActionResult<Models.TimeTable> GetTimeTableById(int id)
    {
        var timeTable = TimeTableProvider.GetTimeTableById(_context, id);
        if (timeTable == null)
        {
            return NotFound();
        }

        return Ok(timeTable);
    }
    
    [HttpPost]
    public ActionResult CreateTimeTable([FromBody] Models.TimeTable timeTable)
    {
        if (timeTable == null)
        {
            return BadRequest("TimeTable cannot be null.");
        }

        try
        {
            TimeTableProvider.CreateTimeTable(_context, timeTable);
            return Created("/api/timetable",  timeTable);
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error");
        }
    }

    [HttpPut("{id}")]
    public ActionResult UpdateTimeTable([FromBody] Models.TimeTable timeTable, int id)
    {
        try
        {
            timeTable.Id = id;
            TimeTableProvider.UpdateTimeTable(_context, timeTable);
            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error");
        }
    }
    
    [HttpDelete("{id}")]
    public ActionResult DeleteTimeTable(int id)
    {
        try
        {
            TimeTableProvider.DeleteTimeTable(_context, id);
            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error");
        }
    }
}