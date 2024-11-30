using System.ComponentModel.DataAnnotations;
using hihihiha.Models.Database;

namespace hihihiha.Models;

public class Group
{
    public int Id { get; set; }
    [MaxLength(256)]
    public required string Name { get; set; }
    public int InstitutId { get; set; }
    public Institut? Institut { get; set; }
    public int SpecialtyId { get; set; }
    public Specialty? Specialty { get; set; }
    public int Course { get; set; }
}