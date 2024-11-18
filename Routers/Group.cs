using Microsoft.AspNetCore.Mvc;
using hihihiha.Services;
using hihihiha.Models; 
using hihihiha.Context;

namespace hihihiha.Routers;

[ApiController]
[Route("groups")]
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
        var groups = GroupProvider.GetAllGroups(_context);
        return Ok(groups);
    }

    // Получить группу по id
    // /groups/{id}
    [HttpGet("{id}")]
    public ActionResult<Group> GetGroupById(int id)
    {
        var group = GroupProvider.GetGroupById(_context, id);
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
            GroupProvider.CreateGroup(_context, group);
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
            GroupProvider.UpdateGroup(_context, group);
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
            GroupProvider.DeleteGroup(_context, id);
            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error: {e.Message}");
        }
    }
}