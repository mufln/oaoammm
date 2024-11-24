using hihihiha.Context;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace hihihiha.Routers;



[ApiController]
[Route("campus")]
[Authorize(Roles = "0")]
public class CampusController : ControllerBase
{
    private readonly ApplicationContext _context;

    public CampusController(ApplicationContext context)
    {
        _context = context;
    }
    
    
    [HttpGet]
    public async Task<ActionResult<List<Models.Campus>>> GetAllCampuses()
    {
        var campuses = await _context.Campus.ToListAsync();
        return Ok(campuses);
    }

    
   [HttpGet("{id}")]
    public async Task<ActionResult<Models.Campus>> GetCampusById(int id)
    {
        var campus = await _context.Campus.FindAsync(id);
        return Ok(campus);
    }

    
    [HttpPost]
    public async Task<ActionResult> CreateCampus([FromBody] Models.Campus campus)
    {
        try
        {
            await _context.Campus.AddAsync(campus);
            await _context.SaveChangesAsync();
            return Created();
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error");
        }
    }
    

   [HttpPut("{id}")]
    public async Task<ActionResult> UpdateCampus(int id, [FromBody] Models.Campus campus)
    {
        try
        {
            campus.Id = id;
            var existingCampus = await _context.Campus.FindAsync(campus.Id);
            if (existingCampus == null)
            {
                return NotFound();
            }

            if (!string.IsNullOrEmpty(campus.Address))
            {
                existingCampus.Address = campus.Address;
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
    public async Task<ActionResult> DeleteCampus(int id)
    {
        try
        {
            var campus = await _context.Campus.FindAsync(id);
            if (campus != null)
            {
                _context.Campus.Remove(campus);
                await _context.SaveChangesAsync();
            }
            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error: {e.Message}");
        }
    }
}