using hihihiha.Context;
using hihihiha.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace hihihiha.Routers;

[ApiController]
[Route("lecturers")]
public class LecturerController : ControllerBase
{
    private readonly ApplicationContext _context;

    public LecturerController(ApplicationContext context)
    {
        _context = context;
    }   
    
    
    [HttpGet]
    public async Task<ActionResult<List<Models.Lecturer>>> GetAllLecturers()
    {
        var lecturers = await _context.Lecturers.Include(l => l.Classes).Include(l => l.User).ToListAsync();
        return Ok(lecturers);
    }

    
    [HttpGet("{id}")]
    public async Task<ActionResult<Models.Lecturer>> GetLecturerById(int id)
    {
        var lecturer = await _context.Lecturers.Include(l => l.Classes).Include(l => l.User).FirstOrDefaultAsync(l => l.Id == id);
        if (lecturer == null)
        {
            return NotFound();
        }

        return Ok(lecturer);
    }

    
    [HttpPost]
    public async Task<ActionResult> CreateLecturer([FromBody] Models.Lecturer lecturer)
    {
        try
        {
            lecturer.Classes = await _context.Classes.Where(c => lecturer.ClassesId.Contains(c.SpecialtyId)).ToListAsync();
            lecturer.User = await _context.Users.FirstOrDefaultAsync(u => u.Id == lecturer.UserId);
            await _context.Lecturers.AddAsync(lecturer);
            await _context.SaveChangesAsync();
            return Created();
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error");
        }
    }

    
    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateLecturer(int id, [FromBody] Models.Lecturer lecturer)
    {
        try
        {
            lecturer.Id = id;
            var existingLecturer = await _context.Lecturers.Include(l => l.Classes).Include(l => l.User).FirstOrDefaultAsync(l => l.Id == id);
            if (existingLecturer == null)
            {
                return NotFound();
            }
            if (lecturer.UserId != 0)
            {
                existingLecturer.UserId = lecturer.UserId;
            }
            if (lecturer.Classes != null)
            {
                existingLecturer.Classes = lecturer.Classes;
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
    public async Task<ActionResult> DeleteLecturer(int id)
    {
        try
        {
            var lecturer = await _context.Lecturers.Include(l => l.Classes).Include(l => l.User).FirstOrDefaultAsync(l => l.Id == id);
            if (lecturer != null)
            {
                _context.Lecturers.Remove(lecturer);
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