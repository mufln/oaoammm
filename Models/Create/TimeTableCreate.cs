namespace hihihiha.Models;

public class TimeTableCreate
{
    public int RoomId { get; set; }
    public int ClassId { get; set; }
    public int[] GroupIds { get; set; }
    public int LecturerId { get; set; }
    public int CampusId { get; set; }
    public required int Week { get; set; }
    public required int Day { get; set; }
    public required int Slot { get; set; }
    public required SlotTypes SlotType { get; set; }
}