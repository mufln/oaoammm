using hihihiha.Models;
using Microsoft.EntityFrameworkCore;

namespace hihihiha.Context;

public class ApplicationContext: DbContext
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Role> Roles => Set<Role>();
    public DbSet<Group> Groups => Set<Group>();
    public DbSet<Class> Classes => Set<Class>();
    public DbSet<Institut> Instituts => Set<Institut>();
    public DbSet<Lecturer> Lecturers => Set<Lecturer>();
    public DbSet<Capmus> Capmus => Set<Capmus>();
    public DbSet<TimeTable> TimeTables => Set<TimeTable>();
    public ApplicationContext() => Database.EnsureCreated();
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql($"host={Env.DB_HOST}" +
                                 $";port={Env.DB_PORT}" +
                                 $";user={Env.DB_USER}" +
                                 $";password={Env.DB_PASSWORD}" +
                                 $";database={Env.DB_NAME}");
    }
}