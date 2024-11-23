namespace hihihiha.Models;

public class Lecturer
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User? User { get; set; }
    public int[]? ClassesId { get; set; }
    public ICollection<Class>? Classes { get; set; }
    public int institutionId { get; set; }
    public Institut? Institut { get; set; }
}