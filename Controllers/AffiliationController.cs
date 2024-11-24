using hihihiha.Context;
using hihihiha.Routers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace hihihiha.Controllers;

[ApiController]
[Authorize(Roles = "0")]
[Route("affiliation")]
public class AffiliationController: ControllerBase
{
    private readonly ApplicationContext _context;

    public AffiliationController(ApplicationContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Affiliate>>> GetAllAffiliations()
    {
        var affiliations = await _context.Affiliates.ToListAsync();
        return Ok(affiliations);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Affiliate>> GetAffiliationById(int id)
    {
        var affiliation = await _context.Affiliates.FindAsync(id);
        if (affiliation == null)
        {
            return NotFound();
        }

        return Ok(affiliation);
    }

    [HttpPost]
    public async Task<ActionResult> CreateAffiliation([FromBody] Affiliate? affiliation)
    {
        if (affiliation == null)
        {
            return BadRequest("Affiliate cannot be null.");
        }

        try
        {
            await _context.Affiliates.AddAsync(affiliation);
            await _context.SaveChangesAsync();
            return Created("/api/affiliation", affiliation);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, $"Internal server error");
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateAffiliation([FromBody] Affiliate affiliation, int id)
    {
        try
        {
            Affiliate? existingAffiliation = await _context.Affiliates.FindAsync(id);
            if (existingAffiliation == null)
            {
                throw new Exception("Affiliate not found");
            }

            if (affiliation.Name != null)
            {
                existingAffiliation.Name = affiliation.Name;
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
    public async Task<ActionResult> DeleteAffiliation(int id)
    {
        try
        {
            var affiliation = await _context.Affiliates.FindAsync(id);
            if (affiliation == null)
            {
                throw new Exception("Affiliate not found");
            }

            _context.Affiliates.Remove(affiliation);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, $"Internal server error");
        }
    }
}