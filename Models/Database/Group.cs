using System.ComponentModel.DataAnnotations;

namespace hihihiha.Models;

public class Group
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public int InstitutId { get; set; }
    
    public Institut Institut { get; set; }
}