using System.ComponentModel.DataAnnotations;

namespace hihihiha.Models;

public class TimeTable
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
    public required int Week { get; set; }
    public required int Day { get; set; }
    public required int Slot { get; set; }
    public required SlotTypes SlotType { get; set; }
}