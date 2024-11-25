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
    public required DbSet<Elective> Electives { get; set; }
    public required DbSet<ElectiveMembers> ElectiveMembers { get; set; }
    public required DbSet<Gpa> Gpas { get; set; }
    public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
    {
        Database.EnsureCreated();
        if (!Users.Any())
        {
            Affiliates.Add(new Affiliate
            {
                Id = 1,
                Name = "Филиал 1"
            });
            Instituts.Add(new Institut
            {
                Id = 1,
                Name = "Институт 1",
                AffiliationId = 1
            });
            Specialty.Add(new Specialty
            {
                Id = 1,
                Name = "Администратор",
                InstitutId = 1
            });
            Groups.Add(new Group
                {
                    Id = 1,
                    Name = "Администрация",
                    InstitutId = 1,
                    SpecialtyId = 1,
                    Course = 0
                });
            Users.Add(new User
            {
                Id = 1,
                Name = "Admin",
                Email = "admin@admin.com",
                Login = "admin",
                Password = "admin",
                Phone = "+380505555555",
                GroupId = 1,
                Role = 0
            });
            SaveChanges();
        }
    }
}