using hihihiha.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace hihihiha.Routers;

[ApiController]
[Route("institutes")]
public class InstitutController : ControllerBase
{
    private readonly ApplicationContext _context;

    public InstitutController(ApplicationContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Models.Institut>>> GetAllInstitutions()
    {
        var institutions = await _context.Instituts.ToListAsync();
        return Ok(institutions);
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<Models.Institut>> GetInstitutionById(int id)
    {
        var institution = await _context.Instituts.FindAsync(id);
        if (institution == null)
        {
            return NotFound();
        }

        return Ok(institution);
    }


    [HttpPost]
    public async Task<ActionResult> CreateInstitution([FromBody] Models.InstitutCreate institution)
    {
        try
        {
            var newInstitution = new Models.Institut { Name = institution.Name, AffiliationId = institution.AffiliationId };
            await _context.Instituts.AddAsync(newInstitution);
            await _context.SaveChangesAsync();
            return Created();
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error");
        }
    }

    
    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateInstitution(int id, [FromBody] Models.Institut institution)
    {
        try
        {
            institution.Id = id;
            var existingInstitution = await _context.Instituts.FindAsync(institution.Id);
            if (existingInstitution == null)
            {
                throw new Exception("Institution not found");
            }

            if (!string.IsNullOrEmpty(institution.Name))
            {
                existingInstitution.Name = institution.Name;
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
    public async Task<ActionResult> DeleteInstitution(int id)
    {
        try
        {
            var institution = await _context.Instituts.FindAsync(id);
            if (institution != null)
            {
                _context.Instituts.Remove(institution);
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