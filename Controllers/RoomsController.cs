using hihihiha.Context;
using hihihiha.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace hihihiha.Routers;

[ApiController]
[Route("rooms")]
public class RoomsController : ControllerBase
{
    private readonly ApplicationContext _context;

    public RoomsController(ApplicationContext context)
    {
        _context = context;
    }
    
    
    [HttpGet]
    public async Task<ActionResult<List<Models.Room>>> GetAllRooms()
    {
        var rooms = await _context.Rooms.Include(r => r.Campus).ToListAsync();
        return Ok(rooms);
    }

    
    [HttpGet("{id}")]
    public async Task<ActionResult<Models.Room>> GetRoomById(int id)
    {
        var room = await _context.Rooms.Include(r => r.Campus).FirstOrDefaultAsync(r => r.Id == id);
        if (room == null)
        {
            return NotFound();
        }
        return Ok(room);
    }

    
    [HttpPost]
    public async Task<ActionResult> CreateRoom([FromBody] Models.Room room)
    {
        try
        {
            room.Campus = await _context.Campus.FirstOrDefaultAsync(c => c.Id == room.CampusId);
            await _context.Rooms.AddAsync(room);
            await _context.SaveChangesAsync();
            return Created();
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error");
        }
    }

    
    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateRoom(int id, [FromBody] Models.Room room)
    {
        try
        {
            room.Id = id;
            var existingRoom = await _context.Rooms.Include(r => r.Campus).FirstOrDefaultAsync(r => r.Id == room.Id);
            if (existingRoom == null)
            {
                return NoContent();
            }            
            if (!string.IsNullOrEmpty(room.Name))
            {
                existingRoom.Name = room.Name;
            }
            if (room.CampusId != 0)
            {
                existingRoom.CampusId = room.CampusId;
                existingRoom.Campus = await _context.Campus.FirstOrDefaultAsync(c => c.Id == room.CampusId);
            }
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error");
        }
    }

    
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteRoom(int id)
    {
        try
        {
            var room = await _context.Rooms.FindAsync(id);
            if (room != null)
            {
                _context.Rooms.Remove(room);
                await _context.SaveChangesAsync();
            }
            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error: {e.Message}");
        }
    }
}