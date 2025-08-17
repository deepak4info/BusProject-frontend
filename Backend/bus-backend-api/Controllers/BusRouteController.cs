using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using WebApplication1.Interface;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusRouteController : ControllerBase
    {
        private readonly IBusRouteService _busRouteService;

        public BusRouteController(IBusRouteService busRouteService)
        {
            _busRouteService = busRouteService;
        }

        [HttpGet("between-stations")]
        public async Task<IActionResult> GetBusRoutes([FromQuery] string sourceStationId, [FromQuery] string destinationStationId)
        {
            var result = await _busRouteService.GetBusRoutesBetweenStationsAsync(sourceStationId, destinationStationId);
            return Ok(result);
        }

        [HttpGet("route-stations")]
        public async Task<IActionResult> GetRouteStations(long busRouteId, long fromStationId, long toStationId)
        {
            var stations = await _busRouteService.GetRouteStationsBetweenAsyncwithRoute(busRouteId, fromStationId, toStationId);
            return Ok(stations);
        }
    }
}
