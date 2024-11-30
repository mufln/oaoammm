using System.ComponentModel.DataAnnotations;

namespace hihihiha.Models;

public class PerformanceCreate
{
    public int TimeTableId { get; set; }
    public int UserId { get; set; }
    public int Points { get; set; }
    public Attendance Attendance { get; set; }
}