using System.ComponentModel.DataAnnotations;

namespace hihihiha.Models;

public class UserUpdate
{
    public string? Name { get; set; }
    public string? Email { get; set; }
    public string? Password { get; set; }
    public string? Phone { get; set; }
    public string? Login { get; set; }
    public int GroupId { get; set; }
    public int RoleId { get; set; }
}