using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Interface;
using WebApplication1.Models;

// for using BusMaster 

[Route("api/[controller]")]
[ApiController]
public class BusMasterController : ControllerBase
{
    private readonly IBusMasterService _busMasterService;

    public BusMasterController(IBusMasterService busMasterService)
    {
        _busMasterService = busMasterService;
    }

    // GET: api/BusMaster
    [HttpGet]
    public async Task<ActionResult<IEnumerable<BusMasterModel>>> GetAllBuses()
    {
        try
        {
            var buses = await _busMasterService.GetAllBusesAsync();
            return Ok(buses);
        }
        catch (Exception ex)
        {
            // Log the exception here
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    // GET: api/BusMaster/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<BusMasterModel>> GetBusById(decimal id)
    {
        try
        {
            var bus = await _busMasterService.GetBusByIdAsync(id);
            if (bus == null)
            {
                return NotFound();
            }
            return Ok(bus);
        }
        catch (Exception ex)
        {
            // Log the exception here
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    // POST: api/BusMaster/AddBus
    [HttpPost]
    public async Task<ActionResult<BusMasterModel>> AddBus(BusMasterModel bus)
    {
        try
        {
            var createdBus = await _busMasterService.AddBusAsync(bus);
            return CreatedAtAction(nameof(GetBusById), new { id = createdBus.BUSID }, createdBus);
        }
        catch (Exception ex)
        {
            // Log the exception here
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    // PUT: api/BusMaster/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBus(decimal id, BusMasterModel bus)
    {
        try
        {
            if (id != bus.BUSID)
            {
                return BadRequest("Bus ID mismatch");
            }

            var updatedBus = await _busMasterService.UpdateBusAsync(bus);
            return Ok(updatedBus);
        }
        catch (Exception ex)
        {
            // Log the exception here
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    // DELETE: api/BusMaster/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBus(decimal id)
    {
        try
        {
            var isDeleted = await _busMasterService.DeleteBusAsync(id);
            if (!isDeleted)
            {
                return NotFound();
            }
            return NoContent();
        }
        catch (Exception ex)
        {
            // Log the exception here
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}