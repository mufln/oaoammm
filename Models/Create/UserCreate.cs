using System.ComponentModel.DataAnnotations;

namespace hihihiha.Models;

public class UserCreate
{
    
    public required string Name { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
    public required string Phone { get; set; }
    public required string Login { get; set; }
    public int GroupId { get; set; }
    public Roles Role { get; set; }
}