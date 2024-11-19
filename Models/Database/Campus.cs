using System.ComponentModel.DataAnnotations;

namespace hihihiha.Models;

public class Campus
{
    public int Id { get; set; }
    [Required]
    public string Address { get; set; }
}