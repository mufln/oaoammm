using System.ComponentModel.DataAnnotations;

namespace hihihiha.Models;

public class Class
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public int Hours { get; set; }
    [Required]
    public int[] Terms { get; set; }
    [Required]
    public ICollection<Group> Groups { get; set; }
}