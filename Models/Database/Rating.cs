using System.ComponentModel.DataAnnotations;

namespace hihihiha.Models;

public class Rating
{
    public int Id { get; set; }
    public int? UserId { get; set; }
    public User? User { get; set; }
    public int? ClassId { get; set; }
    public Class? Class { get; set; }
    public double? Average { get; set; }
    public double? Gpa { get; set; }
}