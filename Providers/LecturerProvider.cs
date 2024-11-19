namespace hihihiha.Services;

public class LecturerProvider
{
    public static List<Models.Lecturer> GetAllLecturers(Context.ApplicationContext context)
    {
        return context.Lecturers.ToList();
    }

    public static Models.Lecturer GetLecturerById(Context.ApplicationContext context, int id)
    {
        return context.Lecturers.Find(id);
    }

    public static void CreateLecturer(Context.ApplicationContext context, Models.Lecturer lecturer)
    {
        try
        {
            lecturer.Classes = context.Classes.Where(c => lecturer.ClassesId.Contains(c.Id)).ToList();
            context.Lecturers.Add(lecturer);
            context.SaveChanges();
        }
        catch (Exception e)
        {
            Console.WriteLine($"Exception while creating lecturer: {e.Message}");
        }
    }

    public static void UpdateLecturer(Context.ApplicationContext context, Models.Lecturer lecturer)
    {
        try
        {
            var existingLecturer = context.Lecturers.Find(lecturer.Id);
            if (existingLecturer == null)
            {
                throw new Exception("Lecturer not found");
            }
            if (lecturer.UserId != 0)
            {
                existingLecturer.UserId = lecturer.UserId;
            }
            if (lecturer.Classes != null)
            {
                existingLecturer.Classes = lecturer.Classes;
            }
            context.SaveChanges();
        }
        catch (Exception e)
        {
            Console.WriteLine($"Exception while updating lecturer: {e.Message}");
        }
    }

    public static void DeleteLecturer(Context.ApplicationContext context, int id)
    {
        var lecturer = context.Lecturers.Find(id);
        if (lecturer != null)
        {
            context.Lecturers.Remove(lecturer);
            context.SaveChanges();
        }
    }
            
}