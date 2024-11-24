using System.Security.Claims;
using hihihiha.Context;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace hihihiha.Controllers;

[ApiController]
[Route("test")]
public class AuthTest : ControllerBase
{
    private readonly ApplicationContext _context;

    public AuthTest(ApplicationContext context)
    {
        _context = context;
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Get()
    {
        
        return Ok(HttpContext.User.Identity.Name + ", " + HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role).Value);
    }
}