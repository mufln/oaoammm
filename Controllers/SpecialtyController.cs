using hihihiha.Context;
using hihihiha.Models.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace hihihiha.Controllers;

[ApiController]
[Route("specialty")]
public class SpecialtyController : ControllerBase
{
    private readonly ApplicationContext _context;

    public SpecialtyController(ApplicationContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Specialty>>> GetAllSpecialties()
    {
        var specialties = await _context.Specialty.ToListAsync();
        return Ok(specialties);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Specialty>> GetSpecialtyById(int id)
    {
        var specialty = await _context.Specialty.FindAsync(id);
        if (specialty == null)
        {
            return NotFound();
        }

        return Ok(specialty);
    }

    [HttpPost]
    public async Task<ActionResult> CreateSpecialty([FromBody] Specialty? specialty)
    {
        if (specialty == null)
        {
            return BadRequest("Specialty cannot be null.");
        }

        try
        {
            await _context.Specialty.AddAsync(specialty);
            await _context.SaveChangesAsync();
            return Created("/api/specialty", specialty);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, $"Internal server error");
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateSpecialty([FromBody] Specialty specialty, int id)
    {
        try
        {
            Specialty? existingSpecialty = await _context.Specialty.FindAsync(id);
            if (existingSpecialty == null)
            {
                throw new Exception("Specialty not found");
            }

            if (specialty.Name != null)
            {
                existingSpecialty.Name = specialty.Name;
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
}