using hihihiha.Context;
using hihihiha.Models.Get;
using hihihiha.Models.Update;

namespace hihihiha.Services;

public class PerformanceProvider
{
    static public List<Models.Performance> GetAllPerformances(ApplicationContext context)
    {
        return context.Performances.ToList();
    }

    static public Models.Performance GetPerformanceById(ApplicationContext context, int id)
    {
        return context.Performances.Find(id);
    }

    static public void CreatePerformance(ApplicationContext context, Models.Performance performance)
    {
        context.Performances.Add(performance);
        context.SaveChanges();
    }

    static public void UpdatePerformance(ApplicationContext context, Models.Performance performance)
    {
        context.Performances.Update(performance);
        context.SaveChanges();
    }

    static public void DeletePerformance(ApplicationContext context, int id)
    {
        context.Performances.Remove(new Models.Performance { Id = id });
        context.SaveChanges();
    }
    
    public static List<Models.Performance> GetPerformancesFiltered(ApplicationContext context, PerformanceGet request)
    {
        var performances = context.Performances.Local.ToList();
        if (request.ClassId != null)
        {
            performances = performances.Where(p => p.TimeTable.ClassId == request.ClassId).ToList();
        }
        if (request.UserId != null)
        {
            performances = performances.Where(p => p.UserId == request.UserId).ToList();
        }
        if (request.Week != null)
        {
            performances = performances.Where(p => p.Week == request.Week).ToList();
        }
        if (request.GroupId != null)
        {
            performances = performances.Where(p => p.TimeTable.Groups.Any(g => g.Id == request.GroupId)).ToList();
        }
        if (request.PointsAscending != null)
        {
            if (request.PointsAscending == true)
            {
                performances = performances.OrderBy(p => p.Points).ToList();
            }
            else
            {
                performances = performances.OrderByDescending(p => p.Points).ToList();
            }   
        }
        if (request.AttendanceAscending != null)
        {
            if (request.AttendanceAscending == true)
            {
                performances = performances.OrderBy(p => p.Attendance).ToList();
            }
            else
            {
                performances = performances.OrderByDescending(p => p.Attendance).ToList();
            }   
        }
        return performances;
    }
    
}