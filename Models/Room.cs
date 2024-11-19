using System.ComponentModel.DataAnnotations;

namespace hihihiha.Models;

public class Room
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public int CampusId { get; set; }
}