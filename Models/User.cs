using System.ComponentModel.DataAnnotations;

namespace hihihiha.Models;

public class User
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
    [Required]
    public string Phone { get; set; }
    [Required]
    public string Login { get; set; }
    public int GroupId { get; set; }
    [Required]
    public int RoleId { get; set; }
}