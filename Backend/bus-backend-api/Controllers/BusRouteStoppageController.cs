using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Interface;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusRouteStoppageController : ControllerBase
    {
        private readonly IBusRouteStoppageService _busRouteStoppageService;

        public BusRouteStoppageController(IBusRouteStoppageService busRouteStoppageService)
        {
            _busRouteStoppageService = busRouteStoppageService;
        }

        // GET: api/BusRouteStoppage
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BusRouteStoppageDetailsModel>>> GetAllStoppages()
        {
            return Ok(await _busRouteStoppageService.GetAllStoppagesAsync());
        }

        // GET: api/BusRouteStoppage/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<BusRouteStoppageDetailsModel>> GetStoppageById(decimal id)
        {
            var stoppage = await _busRouteStoppageService.GetStoppageByIdAsync(id);
            if (stoppage == null)
            {
                return NotFound("Stoppage not found.");
            }
            return Ok(stoppage);
        }

        // POST: api/BusRouteStoppage
        [HttpPost]
        public async Task<ActionResult> AddStoppage(BusRouteStoppageDetailsModel stoppage)
        {
            if (stoppage == null)
            {
                return BadRequest("Invalid input.");
            }

            await _busRouteStoppageService.AddStoppageAsync(stoppage);
            return CreatedAtAction(nameof(GetStoppageById), new { id = stoppage.StopID }, stoppage);
        }

        // PUT: api/BusRouteStoppage/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateStoppage(decimal id, BusRouteStoppageDetailsModel stoppage)
        {
            if (id != stoppage.StopID)
            {
                return BadRequest("ID mismatch.");
            }

            await _busRouteStoppageService.UpdateStoppageAsync(stoppage);
            return NoContent();
        }

        // DELETE: api/BusRouteStoppage/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteStoppage(decimal id)
        {
            await _busRouteStoppageService.DeleteStoppageAsync(id);
            return NoContent();
        }
    }
}
