using hihihiha.Context;
using hihihiha.Models;
using hihihiha.Models.Get;
using hihihiha.Models.Response;
using hihihiha.Models.Update;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Npgsql.TypeMapping;

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

    static public void CreatePerformance(ApplicationContext context, Models.PerformanceCreate performance)
    {
        var Performance = new Performance();
        Performance.TimeTableId = performance.TimeTableId;
        Performance.UserId = performance.UserId;
        Performance.Week = performance.Week;
        Performance.Points = performance.Points;
        Performance.Attendance = performance.Attendance;
        context.Performances.Add(Performance);
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

    public static async Task<ICollection<UserPerformance>> GetPerformancesFiltered(
        ApplicationContext context, PerformanceGet request)
    {
        var performances = context.Performances.AsQueryable();
        if (request.ClassId != null)
        {
            performances = performances.Where(p => p.TimeTable.ClassId == request.ClassId);
        }

        if (request.UserId != null)
        {
            performances = performances.Where(p => p.UserId == request.UserId);
        }

        if (request.Week != null)
        {
            performances = performances.Where(p => p.Week == request.Week);
        }

        if (request.GroupId != null)
        {
            performances = performances.Where(p => p.TimeTable.Groups.Any(g => g.Id == request.GroupId));
        }

        if (request.PointsAscending != null)
        {
            if (request.PointsAscending == true)
            {
                performances = performances.OrderBy(p => p.Points);
            }
            else
            {
                performances = performances.OrderByDescending(p => p.Points);
            }
        }

        if (request.AttendanceAscending != null)
        {
            if (request.AttendanceAscending == true)
            {
                performances = performances.OrderBy(p => p.Attendance);
            }
            else
            {
                performances = performances.OrderByDescending(p => p.Attendance);
            }
        }

        var groupedPerformances = performances
            .GroupBy(entry => entry.User)
            .Select(g => new UserPerformance
            {
                Average = g.Average(p => p.Points),
                Performances = g.ToList(),
                User = g.Key
            });
        return await groupedPerformances.ToListAsync();
    }
}