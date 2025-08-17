using Microsoft.AspNetCore.Mvc;
using WebApplication1.Interface;

[Route("api/[controller]")]
[ApiController]
public class StationsController : ControllerBase
{
    private readonly IStationService _stationService;

    public StationsController(IStationService stationService)
    {
        _stationService = stationService;
    }

    [HttpGet("get-stations")]
    public async Task<IActionResult> GetStationsBetween(string fromStation, string toStation)
    {
        if (string.IsNullOrEmpty(fromStation) || string.IsNullOrEmpty(toStation))
            return BadRequest("Both station names are required.");

        var stations = await _stationService.GetStationsBetweenAsync(fromStation, toStation);

        if (stations.Count == 0)
            return NotFound("No stations found for the given range.");

        return Ok(stations);
    }
}
