namespace hihihiha;

public class Env
{
    public static string DB_HOST
    {
        get
        {
            String? host = Environment.GetEnvironmentVariable("DB_HOST");
            if (host == null)
            {
                return "localhost";
            }
            return host;
        }
    }
    public static string DB_PORT
    {
        get
        {
            String? port = Environment.GetEnvironmentVariable("DB_PORT");
            if (port == null)
            {
                return "5432";
            }
            return port;
        }
    }
    public static string DB_USER
    {
        get
        {
            String? user = Environment.GetEnvironmentVariable("DB_USER");
            if (user == null)
            {
                return "postgres";
            }
            return user;
        }
    }
    public static string DB_PASSWORD
    {
        get
        {
            String? password = Environment.GetEnvironmentVariable("DB_PASSWORD");
            if (password == null)
            {
                return "postgres";
            }
            return password;
        }
    }
    public static string DB_NAME
    {
        get
        {
            String? name = Environment.GetEnvironmentVariable("DB_NAME");
            if (name == null)
            {
                return "ef";
            }
            return name;
        }
    }
}