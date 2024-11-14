namespace hihihiha.Models;

public class TimeTable
{
    public int Id { get; set; }
    public int RoomId { get; set; }
    public int ClassId { get; set; }
    public virtual List<Group> Groups { get; set; }
    public int LecturerId { get; set; }
    public int CapmusId { get; set; }
}