using hihihiha.Context;
using hihihiha.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace hihihiha.Routers;

[ApiController]
[Route("subjects")]
public class ClassController : ControllerBase
{
    private readonly ApplicationContext _context;    

    public ClassController(ApplicationContext context)
    {
        _context = context;
    }
    
    
    [HttpGet]
    public async Task<ActionResult<List<Models.Class>>> GetAllClasses()
    {        
        var classes = await _context.Classes.Include(c => c.Groups).ToListAsync();
        return Ok(classes);
    }
    
    
    [HttpGet("{id}")]
    public async Task<ActionResult<Models.Class>> GetClassById(int id)
    {
        var theClass = await _context.Classes.Include(c => c.Groups).FirstOrDefaultAsync(c => c.Id == id);
        if (theClass == null)
        {
            return NotFound();
        }

        return Ok(theClass);
    }
    
    
    [HttpGet("group/{id}")]
    public async Task<ActionResult<List<Models.Class>>> GetClassesByGroupId(int id)
    {
        var classes = await _context.Classes.Where(c => c.Groups.Any(g => g.Id == id)).ToListAsync();
        if (classes.Count == 0)
        {
            return NotFound();
        }

        return Ok(classes);
    }

    
    [HttpPost]
    public async Task<ActionResult> CreateClass([FromBody] Models.Class newClass)
    {
        try
        {
            newClass.Groups = await _context.Groups.Where(g => newClass.GroupsId.Contains(g.Id)).ToListAsync();
            await _context.Classes.AddAsync(newClass);
            await _context.SaveChangesAsync();
            return Created();
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error");
        }
    }

    
    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateClass([FromBody] Models.Class newClass, int id)
    {
        try
        {
            newClass.Id = id;
            var existingClass = await _context.Classes.Include(c => c.Groups).FirstOrDefaultAsync(c => c.Id == id);
            if (existingClass == null)
            {
                return NotFound();
            }

            if (!string.IsNullOrEmpty(newClass.Name))
            {
                existingClass.Name = newClass.Name;
            }

            if (newClass.Hours != 0)
            {
                existingClass.Hours = newClass.Hours;
            }
            if (newClass.Terms.Length > 0)
            {
                existingClass.Terms = newClass.Terms;
            }

            if (newClass.Groups.Count > 0)
            {
                existingClass.Groups = newClass.Groups;
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
    public async Task<ActionResult> DeleteClass(int id)
    {
        try
        {
            var newClass = _context.Classes.Include(c => c.Groups).FirstOrDefault(c => c.Id == id);
            if (newClass != null)
            {
                _context.Classes.Remove(newClass);
                await _context.SaveChangesAsync();
            }
            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error");
        }
    }
}