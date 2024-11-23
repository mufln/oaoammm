using hihihiha.Models;
using hihihiha.Models.Database;
using hihihiha.Routers;
using Microsoft.EntityFrameworkCore;

namespace hihihiha.Context;

public class ApplicationContext: DbContext
{
    public required DbSet<User> Users { get; set; }
    public required DbSet<Group> Groups { get; set; }
    public required DbSet<Class> Classes { get; set; }
    public required DbSet<Institut> Instituts { get; set; }
    public required DbSet<Lecturer> Lecturers { get; set; }
    public required DbSet<Campus> Campus { get; set; }
    public required DbSet<TimeTable> TimeTables { get; set; }
    public required DbSet<Room> Rooms { get; set; }
    public required DbSet<Performance> Performances { get; set; }
    public required DbSet<Affiliate> Affiliates { get; set; }
    public required DbSet<Specialty> Specialty { get; set; }

    public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
    {
        Database.EnsureCreated();
    }
}