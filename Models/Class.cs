using System.ComponentModel.DataAnnotations;

namespace hihihiha.Models;

public class Class
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public int hours { get; set; }
    [Required]
    public int[] terms { get; set; }
    [Required]
    public virtual List<Group> Groups { get; set; }
}