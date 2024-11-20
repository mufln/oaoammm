using System.Security.Claims;
using hihihiha.Context;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;

namespace hihihiha.Routers;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    private readonly ApplicationContext _context;

    public AuthController(ApplicationContext context)
    {
        _context = context;
    }
    
    [HttpPost]
    [Route("login")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Login([FromBody] Models.Login login)
    {
        if (login == null)
        {
            return UnprocessableEntity("Request cannot be null.");
        }

        try
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == login.Email);
                
            if (user == null)
            {
                return NotFound();
            }

            if (!user.Password.Equals(login.Password))
            {
                return Unauthorized();
            }
            await Authenticate(user.Email, user.Role.ToString());
            return Ok();
        }
        catch (Exception e)
        {
            Console.WriteLine($"Exception while login: {e.Message}");
            return StatusCode(500, $"Internal server error");
        }
    }

    private async Task Authenticate(string email, string role)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimsIdentity.DefaultNameClaimType, email),
            new Claim(ClaimTypes.Role, role)
        };
        ClaimsIdentity identity = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType,
            ClaimsIdentity.DefaultRoleClaimType);
        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity));
    }

    private async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return Ok();
    }
}