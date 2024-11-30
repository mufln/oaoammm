using System.ComponentModel.DataAnnotations;
using hihihiha.Models.Database;

namespace hihihiha.Models;

public class Class
{
    public int Id { get; set; }
    [MaxLength(256)]
    public required string Name { get; set; }
    public int Hours { get; set; }
    public required int[] Terms { get; set; }
    public int SpecialtyId { get; set; }
    public Specialty? Specialty { get; set; }
    public SlotTypes SlotType { get; set; }
}