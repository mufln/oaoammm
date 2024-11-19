using System.ComponentModel.DataAnnotations;
using hihihiha.Models.Get;

namespace hihihiha.Models.Response;

public class UserPerformance
{
    public User User { get; set; }
    public ICollection<Performance> Performances { get; set; }
    public double Average { get; set; }
}