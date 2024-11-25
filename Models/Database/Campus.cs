using System.ComponentModel.DataAnnotations;

namespace hihihiha.Models;

public class Campus
{
    public int Id { get; set; }
    [MaxLength(256)]
    public required string Address { get; set; }
    public int AffiliationId { get; set; }
}