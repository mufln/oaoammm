using System.ComponentModel.DataAnnotations;

namespace hihihiha.Models;

public class GroupCreate
{
    public required string Name { get; set; }
    public int InstitutId { get; set; }
    public int SpecialtyId { get; set; }
    public int Course { get; set; }
}