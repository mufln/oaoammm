namespace hihihiha.Models.Database;

public class Gpa
{
    public int Id { get; set; }
    public double Value { get; set; }
    public int UserId { get; set; }
    public User? User { get; set; }
}