using hihihiha.Models;

namespace hihihiha.Services;

public class ClassProvider
{
    public static List<Models.Class> GetAllClasses(Context.ApplicationContext context)
    {
        return context.Classes.ToList();
    }

    public static Models.Class? GetClassById(Context.ApplicationContext context, int id)
    {
        return context.Classes.Find(id);
    }

    public static List<Models.Class> GetClassesByGroupId(Context.ApplicationContext context, int id)
    {
        return context.Classes.Where(c => c.Groups.Any(g => g.Id == id)).ToList();
    }

    public static void CreateClass(Context.ApplicationContext context, Models.Class newClass)
    {
        // newClass.Groups = new List<Group>();
        newClass.Groups = context.Groups.Where(g => newClass.GroupsId.Contains(g.Id)).ToList();
        
        try
        {
            context.Classes.Add(newClass);
            context.SaveChanges();
        }
        catch (Exception e)
        {
            Console.WriteLine($"Exception while creating subject: {e.Message}");
        }
    }

    public static void UpdateClass(Context.ApplicationContext context, Models.Class newClass)
    {
        try
        {
            var existingClass = context.Classes.Find(newClass.Id);
            if (existingClass == null)
            {
                throw new Exception("Subject not found");
            }

            if (!string.IsNullOrEmpty(newClass.Name))
            {
                existingClass.Name = newClass.Name;
            }

            if (newClass.Hours != 0)
            {
                existingClass.Hours = newClass.Hours;
            }
            if (newClass.Terms.Length > 0)
            {
                existingClass.Terms = newClass.Terms;
            }

            if (newClass.Groups.Count > 0)
            {
                existingClass.Groups = newClass.Groups;
            }

            context.SaveChanges();
        }
        catch
            (Exception e)
        {
            Console.WriteLine($"Exception while updating subject: {e.Message}");
        }
    }

    public static void DeleteClass(Context.ApplicationContext context, int id)
    {
        var newClass = context.Classes.Find(id);
        if (newClass != null)
        {
            context.Classes.Remove(newClass);
            context.SaveChanges();
        }
    }
}