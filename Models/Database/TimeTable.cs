using System.ComponentModel.DataAnnotations;
using hihihiha.Routers;

namespace hihihiha.Models;

public class TimeTable : IComparable<TimeTable>
{
    public int Id { get; set; }
    [Required]
    public int RoomId { get; set; }
    public Room? Room { get; set; }
    public int ClassId { get; set; }
    public Class? Class { get; set; }
    public int[] GroupIds { get; set; }
    public ICollection<Group>? Groups { get; set; }
    public int LecturerId { get; set; }
    public Lecturer? Lecturer { get; set; }
    public int CampusId { get; set; }
    public Campus? Campus { get; set; }
    public int AffiliationId { get; set; }
    public Affiliate? Affiliation { get; set; }
    public required int Week { get; set; }
    public required int Day { get; set; }
    public required int Slot { get; set; }
    public required SlotTypes SlotType { get; set; }
    
    public int CompareTo(TimeTable? other)
    {
        if (other == null)
            return 1;
        bool timeEquals = Day == other.Day && Week == other.Week && Slot == other.Slot;  
        if (timeEquals && RoomId == other.RoomId || 
            timeEquals && LecturerId == other.LecturerId || 
            timeEquals && LecturerId == other.LecturerId && RoomId == other.RoomId)
            return 0;
        return 1;
    }
}