using hihihiha.Context;
using hihihiha.Services;
using Microsoft.AspNetCore.Mvc;

namespace hihihiha.Routers;

[ApiController]
[Route("lecturers")]
public class Lecturer : ControllerBase
{
    private readonly ApplicationContext _context;

    public Lecturer(ApplicationContext context)
    {
        _context = context;
    }   
    
    [HttpGet]
    public ActionResult<List<Models.Lecturer>> GetAllLecturers()
    {
        var lecturers = LecturerProvider.GetAllLecturers(_context);
        return Ok(lecturers);
    }

    [HttpGet("{id}")]
    public ActionResult<Models.Lecturer> GetLecturerById(int id)
    {
        var lecturer = LecturerProvider.GetLecturerById(_context, id);
        if (lecturer == null)
        {
            return NotFound();
        }

        return Ok(lecturer);
    }

    [HttpPost]
    public ActionResult CreateLecturer([FromBody] Models.Lecturer lecturer)
    {
        if (lecturer == null)
        {
            return UnprocessableEntity("Lecturer cannot be null.");
        }

        try
        {
            LecturerProvider.CreateLecturer(_context, lecturer);
            return Created("/api/lecturer",  lecturer);
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error");
        }
    }

    [HttpPut("{id}")]
    public ActionResult UpdateLecturer(int id, [FromBody] Models.Lecturer lecturer)
    {
        try
        {
            lecturer.Id = id;
            LecturerProvider.UpdateLecturer(_context, lecturer);
            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error");
        }
    }

    [HttpDelete("{id}")]
    public ActionResult DeleteLecturer(int id)
    {
        try
        {
            LecturerProvider.DeleteLecturer(_context, id);
            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error: {e.Message}");
        }
    }
}