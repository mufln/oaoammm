using System.ComponentModel.DataAnnotations;

namespace hihihiha.Models;

public class Room
{
    public int Id { get; set; }
    [MaxLength(64)]
    public required string Name { get; set; }
    public int CampusId { get; set; }
    public Campus? Campus { get; set; }
}