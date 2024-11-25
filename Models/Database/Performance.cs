using System.ComponentModel.DataAnnotations;

namespace hihihiha.Models;

public class Performance
{
    public int Id { get; set; }
    public int TimeTableId { get; set; }
    public TimeTable? TimeTable { get; set; }
    public int UserId { get; set; }
    public User? User { get; set; }
    public int Points { get; set; }
    public Attendance Attendance { get; set; }
}