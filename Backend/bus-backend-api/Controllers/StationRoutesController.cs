using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Interface;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StationRoutesController : ControllerBase
    {
        private readonly IStationRouteService stationRouteService;
        public StationRoutesController(IStationRouteService routeService)
        {
            stationRouteService = routeService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllRoutes()
        {
            var routes = await stationRouteService.GetAllRoutesAsync();
            return Ok(routes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRouteById(int id)
        {
            var route = await stationRouteService.GetRouteByIdAsync(id);
            return route != null ? Ok(route) : NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> AddRoute([FromBody] StationRouteModel route)
        {
            var newRoute = await stationRouteService.AddRouteAsync(route);
            return CreatedAtAction(nameof(GetRouteById), new { id = newRoute.BusId }, newRoute);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRoute(int id, [FromBody] StationRouteModel route)
        {
            var updatedRoute = await stationRouteService.UpdateRouteAsync(id, route);
            return updatedRoute != null ? Ok(updatedRoute) : NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoute(int id)
        {
            var deleted = await stationRouteService.DeleteRouteAsync(id);
            return deleted ? NoContent() : NotFound();
        }

    }
}
