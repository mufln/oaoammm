namespace hihihiha.Services;

public class RoomProvider
{
    public static List<Models.Room> GetAllRooms(Context.ApplicationContext context)
    {
        return context.Rooms.ToList();
    }

    public static Models.Room GetRoomById(Context.ApplicationContext context, int id)
    {
        return context.Rooms.Find(id);
    }

    public static void CreateRoom(Context.ApplicationContext context, Models.Room room)
    {
        try
        {
            context.Rooms.Add(room);
            context.SaveChanges();
        }
        catch (Exception e)
        {
            Console.WriteLine($"Exception while creating room: {e.Message}");
        }
    }

    public static void UpdateRoom(Context.ApplicationContext context, Models.Room room)
    {
        try
        {
            var existingRoom = context.Rooms.Find(room.Id);
            if (existingRoom == null)
            {
                throw new Exception("Room not found");
            }            
            if (!string.IsNullOrEmpty(room.Name))
            {
                existingRoom.Name = room.Name;
            }
            if (room.CampusId != 0)
            {
                existingRoom.CampusId = room.CampusId;
            }
            context.SaveChanges();
        }
        catch (Exception e)
        {
            Console.WriteLine($"Exception while updating room: {e.Message}");
        }
    }

    public static void DeleteRoom(Context.ApplicationContext context, int id)
    {
        var room = context.Rooms.Find(id);
        if (room != null)
        {
            context.Rooms.Remove(room);
            context.SaveChanges();
        }
    }
}