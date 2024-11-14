using System.ComponentModel.DataAnnotations;

namespace hihihiha.Models;

public class Institut
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
}