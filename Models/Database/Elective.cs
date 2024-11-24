using hihihiha.Routers;

namespace hihihiha.Models.Database;

public class Elective
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public int AffiliationId { get; set; }
    public Affiliate? Affiliation { get; set; }
    public int CampusId { get; set; }
    public Campus? Campus { get; set; }
    public string? Description { get; set; }
}