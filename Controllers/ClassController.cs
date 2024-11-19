using hihihiha.Context;
using hihihiha.Services;
using Microsoft.AspNetCore.Mvc;

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
    public ActionResult<List<Models.Class>> GetAllClasses()
    {        
        var classes = ClassProvider.GetAllClasses(_context);
        return Ok(classes);
    }
    
    [HttpGet("{id}")]
    public ActionResult<Models.Class> GetClassById(int id)
    {
        var theClass = ClassProvider.GetClassById(_context, id);
        if (theClass == null)
        {
            return NotFound();
        }

        return Ok(theClass);
    }
    
    [HttpGet("group/{id}")]
    public ActionResult<List<Models.Class>> GetClassesByGroupId(int id)
    {
        var classes = ClassProvider.GetClassesByGroupId(_context, id);
        if (classes.Count == 0)
        {
            return NotFound();
        }

        return Ok(classes);
    }

    [HttpPost]
    public ActionResult CreateClass([FromBody] Models.Class newClass)
    {
        if (newClass == null)
        {
            return UnprocessableEntity("Subject cannot be null.");
        }

        try
        {
            ClassProvider.CreateClass(_context, newClass);
            return Created("/subjects",  newClass);
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error");
        }
    }

    [HttpPut("{id}")]
    public ActionResult UpdateClass([FromBody] Models.Class newClass, int id)
    {
        try
        {
            newClass.Id = id;
            ClassProvider.UpdateClass(_context, newClass);
            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error");
        }
    }
    
    [HttpDelete("{id}")]
    public ActionResult DeleteClass(int id)
    {
        try
        {
            ClassProvider.DeleteClass(_context, id);
            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error");
        }
    }
}