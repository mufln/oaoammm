using hihihiha.Context;

namespace hihihiha.Services;

public class TimeTableProvider
{
    public static List<Models.TimeTable> GetAllTimeTables(Context.ApplicationContext context)
    {
        return context.TimeTables.ToList();
    }

    public static Models.TimeTable GetTimeTableById(Context.ApplicationContext context, int id)
    {
        return context.TimeTables.Find(id);
    }

    public static void CreateTimeTable(Context.ApplicationContext context, Models.TimeTable timeTable)
    {
        try
        {
            context.TimeTables.Add(timeTable);
            context.SaveChanges();
        }
        catch (Exception e)
        {
            Console.WriteLine($"Exception while creating timeTable: {e.Message}");
        }
    }

    public static void UpdateTimeTable(ApplicationContext context, Models.TimeTable timeTable)
    {
        try
        {
            var existingTimeTable = context.TimeTables.Find(timeTable.Id);
            if (existingTimeTable == null)
            {
                throw new Exception("TimeTable not found");
            }
            if (timeTable.RoomId != 0)
            {
                existingTimeTable.RoomId = timeTable.RoomId;
            }
            if (timeTable.ClassId != 0)
            {
                existingTimeTable.ClassId = timeTable.ClassId;
            }
            if (timeTable.LecturerId != 0)
            {
                existingTimeTable.LecturerId = timeTable.LecturerId;
            }
            if (timeTable.CampusId != 0)
            {
                existingTimeTable.CampusId = timeTable.CampusId;
            }
            context.SaveChanges();
        }
        catch (Exception e)
        {
            Console.WriteLine($"Exception while updating timeTable: {e.Message}");
        }
    }

    public static void DeleteTimeTable(Context.ApplicationContext context, int id)
    {
        var timeTable = context.TimeTables.Find(id);
        if (timeTable != null)
        {
            context.TimeTables.Remove(timeTable);
            context.SaveChanges();
        }
    }   
    
    public static List<Models.TimeTable> GetTimeTablesByGroupId(Context.ApplicationContext context, int id)
    {
        return context.TimeTables.Where(t => t.Groups.Any(g => g.Id == id)).ToList();
    }
    
    public static List<Models.TimeTable> GetTimeTablesByLecturerId(Context.ApplicationContext context, int id)
    {
        return context.TimeTables.Where(t => t.LecturerId == id).ToList();
    }
}