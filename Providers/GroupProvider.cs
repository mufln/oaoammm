using Microsoft.EntityFrameworkCore;

namespace hihihiha.Services;

public static class GroupProvider
{
    public static List<Models.Group> GetAllGroups(Context.ApplicationContext context)
    {
        return context.Groups.ToList();
    }

    public static Models.Group GetGroupById(Context.ApplicationContext context, int id)
    {
        return context.Groups.Find(id);
    }

    public static void CreateGroup(Context.ApplicationContext context, Models.Group group)
    {
        try
        {
            context.Groups.Add(group);
            context.SaveChanges();
        }
        catch (Exception e)
        {
            Console.WriteLine($"Exception while creating group: {e.Message}");
        }
    }

    public static void UpdateGroup(Context.ApplicationContext context, Models.Group group)
    {
        try
        {
            var existingGroup = context.Groups.Find(group.Id);
            if (existingGroup == null)
            {
                throw new Exception("Group not found");
            }

            if (!string.IsNullOrEmpty(group.Name))
            {
                existingGroup.Name = group.Name;
            }
            if (group.InstitutId != 0)
            {
                existingGroup.InstitutId = group.InstitutId;
            }
            context.SaveChanges();
        }
        catch (Exception e)
        {
            Console.WriteLine($"Exception while updating group: {e.Message}");
        }
    }

    public static void DeleteGroup(Context.ApplicationContext context, int id)
    {
        var group = context.Groups.Find(id);
        if (group != null)
        {
            context.Groups.Remove(group);
            context.SaveChanges();
        }
    }
}