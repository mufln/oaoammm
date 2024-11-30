using System.ComponentModel.DataAnnotations;
using hihihiha.Routers;

namespace hihihiha.Models;

public class Institut
{
    public int Id { get; set; }
    [MaxLength(256)]
    public required string Name { get; set; }
    public int AffiliationId { get; set; }
    public Affiliate? Affiliation { get; set; }
}