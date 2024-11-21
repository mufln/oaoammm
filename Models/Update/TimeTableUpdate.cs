namespace hihihiha.Models.Update;

public class TimeTableUpdate
{    
    public int RoomId { get; set; }
    public int ClassId { get; set; }
    public int[] GroupIds { get; set; }
    public int LecturerId { get; set; }
    public int CampusId { get; set; }
    public int Week { get; set; }
    public int Day { get; set; }
    public int Slot { get; set; }
    public SlotTypes SlotType { get; set; }
}