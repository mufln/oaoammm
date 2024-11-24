using System.ComponentModel.DataAnnotations;

namespace hihihiha.Models.Get;

public class PerformanceGet
{
    public int? Id { get; set; }
    public int? UserId { get; set; }
    public int? Week { get; set; }
    public int? ClassId { get; set; }
    public int? GroupId { get; set; }
    public bool? PointsAscending { get; set; }
    public bool? AttendanceAscending { get; set; }
    public Attendance? Attendance { get; set; }
}