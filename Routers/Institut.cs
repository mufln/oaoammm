using hihihiha.Context;
using hihihiha.Services;
using Microsoft.AspNetCore.Mvc;

namespace hihihiha.Routers;

[ApiController]
[Route("institutes")]
public class Institut : ControllerBase
{
    private readonly ApplicationContext _context;    

    public Institut(ApplicationContext context)
    {
        _context = context;
    }
    
    [HttpGet]
    public ActionResult<List<Models.Institut>> GetAllInstitutions()
    {        
        var institutions = InstitutProvider.GetAllInstitutions(_context);
        return Ok(institutions);
    }

    [HttpGet("{id}")]
    public ActionResult<Models.Institut> GetInstitutionById(int id)
    {
        var institution = InstitutProvider.GetInstitutionById(_context, id);
        if (institution == null)
        {
            return NotFound();
        }

        return Ok(institution);
    }

    [HttpPost]
    public ActionResult CreateInstitution([FromBody] Models.Institut institution)
    {
        if (institution == null)
        {
            return UnprocessableEntity("Institution cannot be null.");
        }

        try
        {
            InstitutProvider.CreateInstitution(_context, institution);
            return Created("/api/institution",  institution);
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error");
        }
    }

    [HttpPut("{id}")]
    public ActionResult UpdateInstitution(int id, [FromBody] Models.Institut institution)
    {
        try
        {
            institution.Id = id;
            InstitutProvider.UpdateInstitution(_context, institution);
            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error");
        }
    }

    [HttpDelete("{id}")]
    public ActionResult DeleteInstitution(int id)
    {
        try
        {
            InstitutProvider.DeleteInstitution(_context, id);
            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error: {e.Message}");
        }
    }
}