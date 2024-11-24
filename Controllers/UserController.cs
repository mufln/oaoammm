using hihihiha.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
    public async Task<ActionResult<List<Models.User>>> GetAllUsers()
    {
        var users = await _context.Users.Include(u => u.Group).ToListAsync();
        return Ok(users);
    }

    
    [HttpGet("{id}")]
    public async Task<ActionResult<Models.User>> GetUserById(int id)
    {
        var user = _context.Users.Include(u => u.Group).FirstOrDefault(u => u.Id == id);
        if (user == null)
        {
            return NotFound();
        }

        return Ok(user);
    }

    
   [HttpPost]
    public async Task<ActionResult> CreateUser([FromBody] Models.UserCreate user)
    {
        try
        {
            var newUser = new Models.User
            {
                Name = user.Name,
                Email = user.Email,
                Password = user.Password,
                Phone = user.Phone,
                Login = user.Login,
                GroupId = user.GroupId,
                Role = user.Role
            };
            await _context.Users.AddAsync(newUser);
            await _context.SaveChangesAsync();
            return Created();
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error");
        }
    }

    
    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateUser(int id, [FromBody] Models.User user)
    {
        try
        {
            user.Id = id;
            var existingUser = await _context.Users.Include(u => u.Group).FirstOrDefaultAsync(u => u.Id == user.Id);
            if (existingUser == null)
            {
                return NotFound();
            }

            if (!string.IsNullOrEmpty(user.Name))
            {
                existingUser.Name = user.Name;
            }

            if (!string.IsNullOrEmpty(user.Email))
            {
                existingUser.Email = user.Email;
            }

            if (!string.IsNullOrEmpty(user.Password))
            {
                existingUser.Password = user.Password;
            }

            if (!string.IsNullOrEmpty(user.Phone))
            {
                existingUser.Phone = user.Phone;
            }

            if (!string.IsNullOrEmpty(user.Login))
            {
                existingUser.Login = user.Login;
            }

            if (user.GroupId != 0)
            {
                existingUser.GroupId = user.GroupId;
            }

            if (user.Role != 0)
            {
                existingUser.Role = user.Role;
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
    public async Task<ActionResult> DeleteUser(int id)
    {
        try
        {
            var user = await _context.Users.Include(u => u.Group).FirstOrDefaultAsync(u => u.Id == id);
            if (user != null)
            {
                _context.Users.Remove(user);
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