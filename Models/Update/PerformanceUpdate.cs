using System.ComponentModel.DataAnnotations;

namespace hihihiha.Models.Update;

public class PerformanceUpdate
{
    public int? TimeTableId { get; set; }
    public int? UserId { get; set; }
    public int? Week { get; set; }
    public int? Points { get; set; }
    public Attendance? Attendance { get; set; }
}