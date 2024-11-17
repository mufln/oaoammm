namespace hihihiha.Services;

public class CampusProvider
{
    public static List<Models.Campus> GetAllCampuses(Context.ApplicationContext context)
    {
        return context.Campus.ToList();
    }

    public static Models.Campus GetCampusById(Context.ApplicationContext context, int id)
    {
        return context.Campus.Find(id);
    }

    public static void CreateCampus(Context.ApplicationContext context, Models.Campus campus)
    {
        try
        {
            context.Campus.Add(campus);
            context.SaveChanges();
        }
        catch (Exception e)
        {
            Console.WriteLine($"Exception while creating campus: {e.Message}");
        }
    }

    public static void UpdateCampus(Context.ApplicationContext context, Models.Campus campus)
    {
        try
        {
            var existingCampus = context.Campus.Find(campus.Id);
            if (existingCampus == null)
            {
                throw new Exception("Campus not found");
            }

            if (!string.IsNullOrEmpty(campus.Address))
            {
                existingCampus.Address = campus.Address;
            }
            context.SaveChanges();
        }
        catch (Exception e)
        {
            Console.WriteLine($"Exception while updating campus: {e.Message}");
        }
    }

    public static void DeleteCampus(Context.ApplicationContext context, int id)
    {
        var campus = context.Campus.Find(id);
        if (campus != null)
        {
            context.Campus.Remove(campus);
            context.SaveChanges();
        }
    }
}