namespace hihihiha.Models.Database;

public class ElectiveMembers
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User? User { get; set; }
    public int ElectiveId { get; set; }
    public Elective? Elective { get; set; }
}