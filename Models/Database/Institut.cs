using System.ComponentModel.DataAnnotations;

namespace hihihiha.Models;

public class Institut
{
    public int Id { get; set; }
    [MaxLength(256)]
    public required string Name { get; set; }
}