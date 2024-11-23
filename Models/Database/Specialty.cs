namespace hihihiha.Models.Database;

public class Specialty
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public int InstitutId { get; set; }
    public Institut? Institut { get; set; }
}