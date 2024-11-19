using hihihiha.Context;
using hihihiha.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace hihihiha.Routers;
[ApiController]
[Route("users")]
public class UserController : ControllerBase
{
    private readonly ApplicationContext _context;

    public UserController(ApplicationContext context)
    {
        _context = context;
    }
    
    [HttpGet]
    public ActionResult<List<Models.User>> GetAllUsers()
    {
        var users = UserProvider.GetAllUsers(_context);
        return Ok(users);
    }

    [HttpGet("{id}")]
    public ActionResult<Models.User> GetUserById(int id)
    {
        var user = UserProvider.GetUserById(_context, id);
        if (user == null)
        {
            return NotFound();
        }

        return Ok(user);
    }

   [HttpPost]
    public ActionResult CreateUser([FromBody] Models.UserCreate? user)
    {
        if (user == null)
        {
            return UnprocessableEntity("User cannot be null.");
        }

        try
        {
            UserProvider.CreateUser(_context, user);
            return Created("/api/user",  user);
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error");
        }
    }

    [HttpPut("{id}")]
    public ActionResult UpdateUser(int id, [FromBody] Models.User user)
    {
        try
        {
            user.Id = id;
            UserProvider.UpdateUser(_context, user);
            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error");
        }
    }

    [HttpDelete("{id}")]
    public ActionResult DeleteUser(int id)
    {
        try
        {
            UserProvider.DeleteUser(_context, id);
            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error: {e.Message}");
        }
    }
}