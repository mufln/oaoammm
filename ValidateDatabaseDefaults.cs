using hihihiha.Context;
using Microsoft.EntityFrameworkCore;

namespace hihihiha;

public class DatabaseDefaults
{
    public static void Validate(ApplicationContext context)
    {
        context.Database.EnsureCreated();
        context.Database.Migrate();
        if (context.Roles.Local.FirstOrDefault(role => role.Name == "Администратор") == null)
        {
            context.Roles.Add(new Models.Role { Name = "Администратор", Id = 1 });
        }
        if (context.Roles.Local.FirstOrDefault(role => role.Name == "Ректор") == null)
        {
            context.Roles.Add(new Models.Role { Name = "Ректор" , Id = 2 });
        }
        if (context.Roles.Local.FirstOrDefault(role => role.Name == "Заведующий кафедры") == null)
        {
            context.Roles.Add(new Models.Role { Name = "Заведующий кафедры" , Id = 3 });
        }
        if (context.Roles.Local.FirstOrDefault(role => role.Name == "Студент") == null)
        {
            context.Roles.Add(new Models.Role { Name = "Студент" , Id = 4 });
        }
        context.SaveChanges();
    }
}