using System.ComponentModel.DataAnnotations;
using hihihiha.Models.Get;

namespace hihihiha.Models.Response;

public class UserPerformance
{
    public int Id { get; set; }
    public ICollection<Performance>? Performances { get; set; }
    public double Gpa { get; set; }
    public double Average { get; set; }
}