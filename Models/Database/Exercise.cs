namespace hihihiha.Models.Database;

public class Exercise
{
    public int Id { get; set; }
    public required string RepoLink { get; set; }
    public required string Name { get; set; }
    public int StudentId { get; set; }
    public User? Student { get; set; }
    public int LecturerId { get; set; }
    public Lecturer? Lecturer { get; set; }
}