using System.ComponentModel.DataAnnotations;

namespace hihihiha.Models;

public class Group
{
    public int Id { get; set; }
    [MaxLength(256)]
    public required string Name { get; set; }
    public int InstitutId { get; set; }
    public Institut? Institut { get; set; }
}