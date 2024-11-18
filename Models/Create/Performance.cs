using System.ComponentModel.DataAnnotations;

namespace hihihiha.Models;

public class Performance
{
    public int Id { get; set; }
    [Required]
    public int TimeTableId { get; set; }
    public TimeTable? TimeTable { get; set; }
    [Required]
    public int UserId { get; set; }
    [Required]
    public int Week { get; set; }
    public int Points { get; set; }
    public Attendance Attendance { get; set; }
}