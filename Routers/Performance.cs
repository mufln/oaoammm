using hihihiha.Context;
using hihihiha.Models.Get;
using hihihiha.Models.Update;
using hihihiha.Services;
using Microsoft.AspNetCore.Mvc;

namespace hihihiha.Routers;

[ApiController]
[Route("performances")]
public class Performance : ControllerBase
{
    private readonly ApplicationContext _context;
    public Performance(ApplicationContext context)
    {
        _context = context;
    }
    [HttpGet]
    public ActionResult<List<Models.Performance>> GetAllPerformances()
    {
        var performances = PerformanceProvider.GetAllPerformances(_context);
        return Ok(performances);
    }
    [HttpGet("{id}")]
    public ActionResult<Models.Performance> GetPerformanceById(int id)
    {
        var performance = PerformanceProvider.GetPerformanceById(_context, id);
        return Ok(performance);
    }
    [HttpPost]
    public ActionResult CreatePerformance(Models.Performance performance)
    {
        if (performance == null)
        {
            return UnprocessableEntity("Performance cannot be null.");
        }
        
        try
        {
            PerformanceProvider.CreatePerformance(_context, performance);
            return Created("/api/performance", performance);
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error");
        }
    }

    [HttpPost("{id}")]

    public ActionResult UpdatePerformance(int id, Models.Performance performance)
    {
        try
        {
            performance.Id = id;
            PerformanceProvider.UpdatePerformance(_context, performance);
            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error");
        }
    }
    [HttpDelete("{id}")]
    public ActionResult DeletePerformance(int id)
    {
        try
        {
            PerformanceProvider.DeletePerformance(_context, id);
            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error: {e.Message}");
        }
    }

    [HttpPost("filter_by")]
    public ActionResult<List<Performance>> GetPerformanceFiltered(PerformanceGet request)
    {
        try
        {
            var performances = PerformanceProvider.GetPerformancesFiltered(_context, request);
            
            return Ok(performances);
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error: {e.Message}");
        }
    }
}