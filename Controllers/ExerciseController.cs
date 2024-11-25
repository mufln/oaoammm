using hihihiha.Context;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Headers;
using hihihiha.Models.Database;
using System.Text.Json;

namespace hihihiha.Controllers;

[ApiController]
[Authorize(Roles = "Admin")]
[Route("exercises")]
public class ExerciseController : ControllerBase
{
    private readonly ApplicationContext _context;

    public ExerciseController(ApplicationContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Exercise>>> GetExercises()
    {
        var exercises = await _context.Exercises.ToListAsync();
        return Ok(exercises);
    }

    [HttpGet("lecturer/{id}")]
    public async Task<ActionResult<IEnumerable<Exercise>>> GetExercisesByLecturerId(int id)
    {
        var exercises = await _context.Exercises.Where(t => t.LecturerId == id).ToListAsync();
        return Ok(exercises);
    }

    // [HttpGet("lecturer/{lecturerId}/group/{groupId}")]
    // public async Task<ActionResult<IEnumerable<Exercise>>> GetGroupExercisesByLecturerId(int lecturerId, int groupId)
    // {
    //     var exercises = await _context.Exercises.Where(t => t.LecturerId == lecturerId && t.Student.GroupId == groupId).ToListAsync();
    //     return Ok(exercises);
    // }

    [HttpGet("{id}")]
    public async Task<ActionResult<Exercise>> GetExerciseById(int id)
    {
        var exercise = await _context.Exercises.FirstOrDefaultAsync(exercise => exercise.Id == id);
        return Ok(exercise);
    }

    // [HttpPost]
    // public async Task<ActionResult<Exercise>> CrreateExercise([FromBody] Exercise exercise)
    // {
    //     try
    //     {
    //         var newExercise = new Exercise
    //         {
    //             Name = exercise.Name,
    //             StudentId = exercise.StudentId,
    //             Student = _context.Users.FindAsync(exercise.StudentId).Result,
    //             LecturerId = exercise.LecturerId,
    //             Lecturer = _context.Lecturers.FindAsync(exercise.LecturerId).Result
    //         };
    //         await _context.Exercises.AddAsync(newExercise);
    //         await _context.SaveChangesAsync();
    //         return Created();
    //     }
    //     catch (Exception e)
    //     {
    //         return StatusCode(500, $"Internal server error");
    //     }
    // }

    [HttpPost("group/{id}")]
    public async Task<ActionResult<Exercise>> CreateExerciseForGroup(int id, [FromBody] Exercise exercise)
    {
        try
        {
            var students = await _context.Users.Where(u => u.GroupId == id).ToListAsync();
            foreach (var student in students)
            {
                HttpClient client = new HttpClient();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "glpat-TsqJMn77zKq5NzWsExuT");
                
                
                var response = await client.GetAsync($"http://{Env.GITLAB_IP}/api/v4/users?username={student.Login}");
                int userId;
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    var doc = JsonDocument.Parse(content);
                    if (doc.RootElement.GetArrayLength() == 0)
                    {
                        return StatusCode(500, $"Internal server error");
                    }
                    userId = doc.RootElement[0].GetProperty("id").GetInt32();
                }
                else
                {
                    return StatusCode(500, $"Internal server error");
                }
                
                var projectContent = new FormUrlEncodedContent(new[]
                {
                    new KeyValuePair<string, string>("name", exercise.Name),
                    new KeyValuePair<string, string>("namespace_id", userId.ToString()),
                    new KeyValuePair<string, string>("visibility", "public")
                });

                response = await client.PostAsync(
                    $"http://{Env.GITLAB_IP}/api/v4/projects",
                    projectContent);

                HttpContent responseContent = response.Content;
                var c = response.StatusCode;
                Console.WriteLine($"{(int)c}: {c}");

                using (var reader = new StreamReader(await responseContent.ReadAsStreamAsync()))
                {
                    Console.WriteLine(await reader.ReadToEndAsync());
                }
                
                
                var newExercise = new Exercise
                {
                    Name = exercise.Name,
                    RepoLink = $"http://{student.Login}/{exercise.Name}#",
                    StudentId = student.Id,
                    Student = student,
                    LecturerId = exercise.LecturerId,
                    Lecturer = _context.Lecturers.FindAsync(exercise.LecturerId).Result
                };
                await _context.Exercises.AddAsync(newExercise);
            }
            return Created();
        } catch (Exception e)
        {
            return StatusCode(500, $"Internal server error");
        }
    }
}