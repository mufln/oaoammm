using hihihiha.Models;
using Microsoft.EntityFrameworkCore;

namespace hihihiha.Context;

public class ApplicationContext: DbContext
{
    public required DbSet<User> Users { get; set; }
    public required DbSet<Role> Roles { get; set; }
    public required DbSet<Group> Groups { get; set; }
    public required DbSet<Class> Classes { get; set; }
    public required DbSet<Institut> Instituts { get; set; }
    public required DbSet<Lecturer> Lecturers { get; set; }
    public required DbSet<Campus> Capmus { get; set; }
    public required DbSet<TimeTable> TimeTables { get; set; }

    public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
    {
        Database.EnsureCreated();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}