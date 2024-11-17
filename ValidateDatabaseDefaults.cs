using hihihiha.Context;
using Microsoft.EntityFrameworkCore;

namespace hihihiha;

public class DatabaseDefaults
{
    public static void Validate(ApplicationContext context)
    {
        context.Database.EnsureCreated();
        context.Database.Migrate();
        if (context.Roles.Find(1) == null)
        {
            context.Roles.Add(new Models.Role { Name = "Администратор", Id = 1 });
        }
        if (context.Roles.Find(2) == null)
        {
            context.Roles.Add(new Models.Role { Name = "Ректор" , Id = 2 });
        }
        if (context.Roles.Find(3) == null)
        {
            context.Roles.Add(new Models.Role { Name = "Заведующий кафедры" , Id = 3 });
        }
        if (context.Roles.Find(4) == null)
        {
            context.Roles.Add(new Models.Role { Name = "Студент" , Id = 4 });
        }
        context.SaveChanges();
    }
}