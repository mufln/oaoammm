using System.ComponentModel.DataAnnotations;

namespace hihihiha.Models;

public class ElectiveCreate
{
    [MaxLength(256)]
    public required string Name { get; set; }
    public int AffiliationId { get; set; }
    public int CampusId { get; set; }
    [MaxLength(1024)]
    public string? Description { get; set; }
}