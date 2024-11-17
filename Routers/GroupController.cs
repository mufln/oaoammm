using Microsoft.AspNetCore.Mvc;
using hihihiha.Services;
using hihihiha.Models; // Убедитесь, что у вас есть правильный путь к модели Group
using hihihiha.Context; // Убедитесь, что у вас есть правильный путь к ApplicationContext

namespace hihihiha.Routers;

[ApiController]
[Route("[controller]")]
public class GroupsController : ControllerBase
{
    private readonly ApplicationContext _context;

    public GroupsController(ApplicationContext context)
    {
        _context = context;
    }

    // Получить все группы
    // /groups
    [HttpGet]
    public ActionResult<List<Group>> GetAllGroups()
    {
        var groups = GroupService.GetAllGroups(_context);
        return Ok(groups);
    }

    // Получить группу по id
    // /groups/{id}
    [HttpGet("{id}")]
    public ActionResult<Group> GetGroupById(int id)
    {
        var group = GroupService.GetGroupById(_context, id);
        if (group == null)
        {
            return NotFound();
        }

        return Ok(group);
    }

    // Создать группу
    // /groups
    [HttpPost]
    public ActionResult CreateGroup([FromBody] Group? group)
    {
        if (group == null)
        {
            return BadRequest("Group cannot be null.");
        }

        try
        {
            GroupService.CreateGroup(_context, group);
            return Created("/api/group",  group);
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error");
        }
    }

    // Изменить группу по id
    // /groups/{id}
    [HttpPut("{id}")]
    public ActionResult UpdateGroup(int id, [FromBody] Group group)
    {
        try
        {
            group.Id = id;
            GroupService.UpdateGroup(_context, group);
            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error");
        }
    }

    // Удалить группу по id
    // /groups/{id}
    [HttpDelete("{id}")]
    public ActionResult DeleteGroup(int id)
    {
        try
        {
            GroupService.DeleteGroup(_context, id);
            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error: {e.Message}");
        }
    }
}