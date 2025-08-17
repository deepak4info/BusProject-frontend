using static System.Collections.Specialized.BitVector32;
using WebApplication1.Interface;
using WebApplication1.Models;
using Microsoft.EntityFrameworkCore;

public class StationService : IStationService
{
    private readonly AppDbContext _context;

    public StationService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<StationMaster>> GetStationsBetweenAsync(string fromStation, string toStation)
    {
        // Fetch Station IDs for given station names
        var stationIds = await _context.StationsMaster
            .Where(s => s.StationName == fromStation || s.StationName == toStation)
             .Select(s => (int)s.StationID) // Explicitly cast to int
        .OrderBy(s => s).ToListAsync();

        if (stationIds.Count != 2)
            return new List<StationMaster>(); // If stations not found, return empty list

        int startId = stationIds[0];
        int endId = stationIds[1];

        // Fetch stations between the IDs
        return await _context.StationsMaster
            .Where(s => s.StationID >= startId && s.StationID <= endId)
            .OrderBy(s => s.StationID)
            .ToListAsync();
    }
}

