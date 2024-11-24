using Microsoft.AspNetCore.Mvc;
using hihihiha.Models; 
using hihihiha.Context;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace hihihiha.Routers;

[ApiController]
[Authorize(Roles = "0")]
[Route("groups")]
public class GroupsController : ControllerBase
{
    private readonly ApplicationContext _context;

    public GroupsController(ApplicationContext context)
    {
        _context = context;
    }

    
    [HttpGet]
    public async Task<ActionResult<List<Group>>> GetAllGroups()
    {
        var groups = await _context.Groups.Include(group => group.Institut).ToListAsync();
        return Ok(groups);
    }
    
    
    [HttpGet("{id}")]
    public async Task<ActionResult<Group>> GetGroupById(int id)
    {
        var group = await _context.Groups.Include(group => group.Institut).FirstOrDefaultAsync(group => group.Id == id);
        if (group == null)
        {
            return NotFound();
        }

        return Ok(group);
    }


    [HttpPost]
    public async Task<ActionResult> CreateGroup([FromBody] GroupCreate group)
    {
        try
        {
            var newGroup = new Models.Group { Name = group.Name, InstitutId = group.InstitutId, SpecialtyId = group.SpecialtyId, Course = group.Course };
            await _context.Groups.AddAsync(newGroup);
            await _context.SaveChangesAsync();
            return Created();
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error");
        }
    }

    
    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateGroup(int id, [FromBody] Group group)
    {
        try
        {
            group.Id = id;
            var existingGroup = await _context.Groups.Include(g => g.Institut).FirstOrDefaultAsync(g => g.Id == id);
            if (existingGroup == null)
            {
                return NotFound();
            }

            if (!string.IsNullOrEmpty(group.Name))
            {
                existingGroup.Name = group.Name;
            }

            if (group.InstitutId != 0)
            {
                existingGroup.InstitutId = group.InstitutId;
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
    public async Task<ActionResult> DeleteGroup(int id)
    {
        try
        {
            var group = await _context.Groups.Include(g => g.Institut).FirstOrDefaultAsync(g => g.Id == id);
            if (group != null)
            {
                _context.Groups.Remove(group);
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