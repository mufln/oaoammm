using System.ComponentModel.DataAnnotations;

namespace hihihiha.Models;

public class Role
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
}