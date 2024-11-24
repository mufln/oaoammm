using System.Security.Claims;
using hihihiha.Context;
using hihihiha.Models;
using hihihiha.Models.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace hihihiha.Controllers;

[ApiController]
[Route("electives")]
[Authorize(Roles = "Admin")]
public class ElectiveController : ControllerBase
{
    private readonly ApplicationContext _context;

    public ElectiveController(ApplicationContext context)
    {
        _context = context;
    }

    [Authorize(Roles = "0")]
    [HttpGet]
    public async Task<ActionResult<List<Elective>>> GetAllElectives()
    {
        var electives = await _context.Electives.ToListAsync();
        return Ok(electives);
    }

    [Authorize(Roles = "0")]
    [HttpGet("{id}")]
    public async Task<ActionResult<Elective>> GetElectiveById(int id)
    {
        var elective = await _context.Electives.FindAsync(id);
        if (elective == null)
        {
            return NotFound();
        }

        return Ok(elective);
    }

    [HttpPost]
    public async Task<ActionResult> CreateElective([FromBody] ElectiveCreate elective)
    {
        try
        {
            var newElective = new Elective { Name = elective.Name, AffiliationId = elective.AffiliationId };
            await _context.Electives.AddAsync(newElective);
            await _context.SaveChangesAsync();
            return Created();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, $"Internal server error");
        }
    }

    [Authorize(Roles = "0")]
    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateElective(int id, [FromBody] Elective elective)
    {
        try
        {
            elective.Id = id;
            var existingElective = await _context.Electives.FindAsync(elective.Id);
            if (existingElective == null)
            {
                return NotFound();
            }

            if (!string.IsNullOrEmpty(elective.Name))
            {
                existingElective.Name = elective.Name;
            }

            if (elective.CampusId != 0)
            {
                existingElective.CampusId = elective.CampusId;
            }

            if (!string.IsNullOrEmpty(elective.Description))
            {
                existingElective.Description = elective.Description;
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

    [Authorize(Roles = "0")]
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteElective(int id)
    {
        try
        {
            var elective = await _context.Electives.FindAsync(id);
            if (elective != null)
            {
                _context.Electives.Remove(elective);
                await _context.SaveChangesAsync();
            }

            return Ok();
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error: {e.Message}");
        }
    }

    [HttpPost("subscribe")]
    [Authorize(Roles = "0, 1, 2")]
    public async Task<ActionResult> SubscribeToElective(int id)
    {
        try
        {
            var elective = await _context.Electives.FindAsync(id);
            if (elective == null)
            {
                return NotFound();
            }

            string? userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized();
            }

            var user = await _context.Users.FindAsync(int.Parse(userId));
            if (user == null)
            {
                return NotFound();
            }

            var membership =
                await _context.ElectiveMembers.FirstOrDefaultAsync(m => m.UserId == user.Id && m.ElectiveId == id);
            if (membership == null)
            {
                var newMembership = new ElectiveMembers { UserId = user.Id, ElectiveId = id };
                await _context.ElectiveMembers.AddAsync(newMembership);
                await _context.SaveChangesAsync();
            }

            return Ok();
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error: {e.Message}");
        }
    }

    [HttpDelete("subscribe")]
    [Authorize(Roles = "0, 1, 2")]
    public async Task<ActionResult> UnsubscribeFromElective(int id)
    {
        try
        {
            var elective = await _context.Electives.FindAsync(id);
            if (elective == null)
            {
                return NotFound();
            }

            string? userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized();
            }

            var user = await _context.Users.FindAsync(int.Parse(userId));
            if (user == null)
            {
                return NotFound();
            }

            var membership =
                await _context.ElectiveMembers.FirstOrDefaultAsync(m => m.UserId == user.Id && m.ElectiveId == id);
            if (membership == null)
            {
                return NotFound();
            }

            _context.ElectiveMembers.Remove(membership);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error: {e.Message}");
        }
    }

    [HttpGet("my_subscriptions")]
    [Authorize(Roles = "0, 1, 2")]
    public async Task<ActionResult<List<Elective>>> GetMySubscriptions()
    {
        try
        {
            string? userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized();
            }

            var user = await _context.Users.FindAsync(int.Parse(userId));
            if (user == null)
            {
                return NotFound();
            }

            var subscriptions = await _context.Electives
                .Where(e => _context.ElectiveMembers.Any(m => m.UserId == user.Id && m.ElectiveId == e.Id))
                .ToListAsync();
            return Ok(subscriptions);
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error: {e.Message}");
        }
    }

    [HttpGet("available")]
    [Authorize(Roles = "0, 1, 2")]
    public async Task<ActionResult<List<Elective>>> GetAvailableElectives()
    {
        try
        {
            string? userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized();
            }

            var user = await _context.Users.Include(u => u.Group).FirstOrDefaultAsync(u => u.Id == int.Parse(userId));
            if (user == null)
            {
                return NotFound();
            }

            user.Group = await _context.Groups.Include(g => g.Institut).FirstOrDefaultAsync(g => g.Id == user.GroupId);
            var availableElectives = await _context.Electives.Include(e => e.Affiliation)
                .Where(e => e.Affiliation.Id == user.Group.Institut.AffiliationId).ToListAsync();
            return Ok(availableElectives);
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error: {e.Message}");
        }
    }
}