using hihihiha.Context;
using hihihiha.Services;
using Microsoft.AspNetCore.Mvc;

namespace hihihiha.Routers;

[ApiController]
[Route("[controller]")]
public class Rooms : ControllerBase
{
    private readonly ApplicationContext _context;

    public Rooms(ApplicationContext context)
    {
        _context = context;
    }
    
    [HttpGet]
    public ActionResult<List<Models.Room>> GetAllRooms()
    {
        var rooms = RoomProvider.GetAllRooms(_context);
        return Ok(rooms);
    }

    [HttpGet("{id}")]
    public ActionResult<Models.Room> GetRoomById(int id)
    {
        var room = RoomProvider.GetRoomById(_context, id);
        if (room == null)
        {
            return NotFound();
        }

        return Ok(room);
    }

    [HttpPost]
    public ActionResult CreateRoom([FromBody] Models.Room room)
    {
        if (room == null)
        {
            return UnprocessableEntity("Room cannot be null.");
        }

        try
        {
            RoomProvider.CreateRoom(_context, room);
            return Created("/api/room",  room);
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error");
        }
    }

    [HttpPut("{id}")]
    public ActionResult UpdateRoom(int id, [FromBody] Models.Room room)
    {
        try
        {
            room.Id = id;
            RoomProvider.UpdateRoom(_context, room);
            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error");
        }
    }

    [HttpDelete("{id}")]
    public ActionResult DeleteRoom(int id)
    {
        try
        {
            RoomProvider.DeleteRoom(_context, id);
            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error: {e.Message}");
        }
    }
}