using hihihiha.Context;
using hihihiha.Models;
using hihihiha.Models.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace hihihiha.Controllers;
[ApiController]
[Route("gpa")]
[Authorize(Roles = "Admin")]
public class GpaController : ControllerBase
{
    private readonly ApplicationContext _context;

    public GpaController(ApplicationContext context)
    {
        _context = context;
    }
    
    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetGpa()
    {
        return Ok(await _context.Gpas.ToListAsync());
    }

    [HttpPost]
    public async Task<ActionResult> CreateGpa()
    {
        try
        {
            await _context.Performances
                .Include(p => p.User)
                .GroupBy(p => p.User).ForEachAsync(userPerformances =>
                {
                    userPerformances.GroupBy(classPerformance =>
                        {
                            classPerformance.TimeTable = _context.TimeTables.Find(classPerformance.TimeTableId);
                            return classPerformance.TimeTable.ClassId;
                        }).ToList()
                        .ForEach(classPerformanceList =>
                        {
                            Group userGroup = _context.Users.Include(u => u.Group).First(u => u.Id == userPerformances.Key.Id).Group;
                            int hoursClass = _context.Classes.Where(c => c.Id == classPerformanceList.Key).Sum(c => c.Hours);
                            int hoursTotal = _context.Classes.Where(c => c.SpecialtyId == userGroup.SpecialtyId).Sum(c => c.Hours);
                            double gpa = classPerformanceList.Average(performance => performance.Points)*hoursClass/hoursTotal*100;
                            _context.Gpas.Add(new Gpa
                            {
                                UserId = userPerformances.Key.Id,
                                Value = gpa
                            });
                        });
                });
            _context.SaveChanges();
            return Ok();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}