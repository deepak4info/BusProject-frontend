using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Interface;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StationMasterController : ControllerBase
    {
        private readonly IStationMasterService _stationMasterService;

        public StationMasterController(IStationMasterService stationMasterService)
        {
            _stationMasterService = stationMasterService;
        }

        // ✅ Get all stations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StationMaster>>> GetAllStations()
        {
            var stations = await _stationMasterService.GetAllProfilesAsync();
            return Ok(stations);
        }

        // ✅ Get station by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<StationMaster>> GetStationById(decimal id)
        {
            var station = await _stationMasterService.GetProfileByIdAsync(id);
            if (station == null)
                return NotFound(new { message = "Station not found" });

            return Ok(station);
        }

        // ✅ Add new station
        [HttpPost]
        public async Task<ActionResult<StationMaster>> AddStation(StationMaster station)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var createdStation = await _stationMasterService.CreateUserProfileAsync(station);
            return Ok(createdStation);
        }

        // ✅ Update existing station
        [HttpPut]
        public async Task<ActionResult> UpdateStation(StationMaster station)
        {
            var updatedStation = await _stationMasterService.UpdateUserProfileAsync(station);
            if (updatedStation == null)
                return NotFound(new { message = "Station not found" });

            return Ok(updatedStation);
        }

        // ✅ Delete station
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteStation(decimal id)
        {
            var result = await _stationMasterService.DeleteUserProfileAsync(id);
            if (!result)
                return NotFound(new { message = "Station not found" });

            return Ok(new { message = "Station deleted successfully" });
        }
    }
}
