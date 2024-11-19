using System.ComponentModel.DataAnnotations;

namespace hihihiha.Models;

public class Class
{
    public int Id { get; set; }
    [MaxLength(256)]
    public required string Name { get; set; }
    public int Hours { get; set; }
    public required int[] Terms { get; set; }
    
    public required int[] GroupsId { get; set; }
    public ICollection<Group> Groups { get; set; }
}