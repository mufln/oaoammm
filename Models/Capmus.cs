using System.ComponentModel.DataAnnotations;

namespace hihihiha.Models;

public class Capmus
{
    public int Id { get; set; }
    [Required]
    public string Address { get; set; }
}