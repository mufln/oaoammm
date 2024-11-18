namespace hihihiha.Models;

public class Performance
{
    public int Id { get; set; }
    public int TimeTableId { get; set; }
    public int UserId { get; set; }
    public int Week { get; set; }
    public int Points { get; set; }
    public Attendance Attendance { get; set; }
}