using hihihiha.Context;

namespace hihihiha.Services;

public class UserProvider
{
    public static List<Models.User> GetAllUsers(Context.ApplicationContext context)
    {
        return context.Users.ToList();
    }

    public static Models.User GetUserById(Context.ApplicationContext context, int id)
    {
        return context.Users.Find(id);
    }

    public static void CreateUser(Context.ApplicationContext context, Models.UserCreate user)
    {
        var newUser = new Models.User
        {
            Name = user.Name,
            Email = user.Email,
            Password = user.Password,
            Phone = user.Phone,
            Login = user.Login,
            GroupId = user.GroupId,
            Role = user.Role
        };
        context.Users.Add(newUser);
        context.SaveChanges();
    }

    public static void UpdateUser(Context.ApplicationContext context, Models.User user)
    {
        try
        {
            var existingUser = context.Users.Find(user.Id);
            if (existingUser == null)
            {
                throw new Exception("User not found");
            }

            if (!string.IsNullOrEmpty(user.Name))
            {
                existingUser.Name = user.Name;
            }

            if (!string.IsNullOrEmpty(user.Email))
            {
                existingUser.Email = user.Email;
            }

            if (!string.IsNullOrEmpty(user.Password))
            {
                existingUser.Password = user.Password;
            }

            if (!string.IsNullOrEmpty(user.Phone))
            {
                existingUser.Phone = user.Phone;
            }

            if (!string.IsNullOrEmpty(user.Login))
            {
                existingUser.Login = user.Login;
            }

            if (user.GroupId != 0)
            {
                existingUser.GroupId = user.GroupId;
            }

            if (user.Role != 0)
            {
                existingUser.Role = user.Role;
            }

            context.SaveChanges();
        }
        catch (Exception e)
        {
            Console.WriteLine($"Exception while updating user: {e.Message}");
        }
    }

    public static void DeleteUser(Context.ApplicationContext context, int id)
    {
        var user = context.Users.Find(id);
        if (user != null)
        {
            context.Users.Remove(user);
            context.SaveChanges();
        }
    }
}