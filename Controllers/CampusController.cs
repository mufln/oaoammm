using hihihiha.Context;
using hihihiha.Models;
using hihihiha.Services;
using Microsoft.AspNetCore.Mvc;

namespace hihihiha.Routers;



[ApiController]
[Route("campus")]
public class CampusController : ControllerBase
{
    private readonly ApplicationContext _context;

    public CampusController(ApplicationContext context)
    {
        _context = context;
    }
    
    [HttpGet]
    public ActionResult<List<Models.Campus>> GetAllCampuses()
    {
        var campuses = CampusProvider.GetAllCampuses(_context);
        return Ok(campuses);
    }

   [HttpGet("{id}")]
    public ActionResult<Models.Campus> GetCampusById(int id)
    {
        var campus = CampusProvider.GetCampusById(_context, id);
        if (campus == null)
        {
            return NotFound();
        }

        return Ok(campus);
    }

    [HttpPost]
    public ActionResult CreateCampus([FromBody] Models.Campus campus)
    {
        if (campus == null)
        {
            return BadRequest("Campus cannot be null.");
        }

        try
        {
            CampusProvider.CreateCampus(_context, campus);
            return Created("/api/campus",  campus);
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error");
        }
    }

   [HttpPut("{id}")]
    public ActionResult UpdateCampus(int id, [FromBody] Models.Campus campus)
    {
        try
        {
            campus.Id = id;
            CampusProvider.UpdateCampus(_context, campus);
            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error");
        }
    }

    [HttpDelete("{id}")]
    public ActionResult DeleteCampus(int id)
    {
        try
        {
            CampusProvider.DeleteCampus(_context, id);
            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error: {e.Message}");
        }
    }
}