namespace hihihiha.Models;

public class TimeTable
{
    public int Id { get; set; }
    public int RoomId { get; set; }
    public int ClassId { get; set; }
    public ICollection<Group> Groups { get; set; }
    public int LecturerId { get; set; }
    public int CampusId { get; set; }
}