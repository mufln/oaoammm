using hihihiha.Context;
using hihihiha.Models;
using hihihiha.Models.Get;
using hihihiha.Models.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace hihihiha.Routers;

[ApiController]
[Authorize(Roles = "Admin, Lecturer")]
[Route("performances")]
public class PerformanceController : ControllerBase
{
    private readonly ApplicationContext _context;

    public PerformanceController(ApplicationContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Performance>>> GetAllPerformances()
    {
        return await _context.Performances.Include(p => p.TimeTable).Include(p => p.User).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Performance>> GetPerformanceById(int id)
    {
        var res = await _context.Performances.FindAsync(id);
        if (res == null)
        {
            return NotFound();
        }

        return Ok(res);
    }

    [HttpPost]
    public async Task<ActionResult> CreatePerformance(PerformanceCreate performance)
    {
        try
        {
            var newPerformance = new Performance
            {
                TimeTableId = performance.TimeTableId, UserId = performance.UserId, 
                Points = performance.Points, Attendance = performance.Attendance
            };
            await _context.Performances.AddAsync(newPerformance);
            await _context.SaveChangesAsync();
            return Created("/api/performance", performance);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, $"Internal server error");
        }
    }

    [HttpPost("{id}")]
    public async Task<ActionResult> UpdatePerformance(int id, Performance performance)
    {
        try
        {
            performance.Id = id;
            _context.Performances.Update(performance);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, $"Internal server error");
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeletePerformance(int id)
    {
        try
        {
            var performance = await _context.Performances.FindAsync(id);
            if (performance == null)
            {
                throw new Exception("Performance not found");
            }

            _context.Performances.Remove(performance);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error: {e.Message}");
        }
    }

    [HttpPost("filter_by")]
    public async Task<ActionResult<ICollection<UserPerformance>>> GetPerformanceFiltered(PerformanceGet request)
    {
        try
        {
            var performances = _context.Performances
                .Include(p => p.TimeTable)
                .Include(p => p.User).AsQueryable();
            if (request.ClassId != null)
            {
                performances = performances.Where(p => p.TimeTable.ClassId == request.ClassId);
            }

            if (request.UserId != null)
            {
                performances = performances.Where(p => p.UserId == request.UserId);
            }

            if (request.Week != null)
            {
                performances = performances.Where(p => p.TimeTable.Week == request.Week);
            }

            if (request.GroupId != null)
            {
                performances = performances.Where(p => p.TimeTable.Groups.Any(g => g.Id == request.GroupId));
            }

            if (request.PointsAscending != null)
            {
                if (request.PointsAscending == true)
                {
                    performances = performances.OrderBy(p => p.Points);
                }
                else
                {
                    performances = performances.OrderByDescending(p => p.Points);
                }
            }

            if (request.AttendanceAscending != null)
            {
                if (request.AttendanceAscending == true)
                {
                    performances = performances.OrderBy(p => p.Attendance);
                }
                else
                {
                    performances = performances.OrderByDescending(p => p.Attendance);
                }
            }

            var groupedPerformances = performances
                .GroupBy(entry => entry.User)
                .Select(g => new UserPerformance
                {
                    Average = g.Average(p => p.Points),
                    Performances = g.ToList(),
                    User = g.Key
                });
            return await groupedPerformances.ToListAsync();
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error: {e.Message}");
        }
    }
}