using System.ComponentModel.DataAnnotations;

namespace hihihiha.Models;

public class User
{
    public int Id { get; set; }
    [MaxLength(128)]
    public string Name { get; set; }
    [MaxLength(128)]
    public required string Email { get; set; }
    [MaxLength(256)]
    public required string Password { get; set; }
    [MaxLength(64)]
    public required string Phone { get; set; }
    [MaxLength(64)]
    public required string Login { get; set; }
    public int GroupId { get; set; }
    public Group? Group { get; set; }
    [Required]
    public Roles Role { get; set; }
    
}