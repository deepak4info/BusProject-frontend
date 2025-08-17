using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Interface;
using WebApplication1.Models;

public class StationRouteService : IStationRouteService
{
    private readonly AppDbContext _context;

    public StationRouteService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<StationRouteModel>> GetAllRoutesAsync()
    {
        return await _context.StationRoutes.ToListAsync();
    }

    public async Task<StationRouteModel> GetRouteByIdAsync(decimal stopId)
    {
        return await _context.StationRoutes.FindAsync(stopId);
    }

    public async Task<StationRouteModel> AddRouteAsync(StationRouteModel busRoute)
    {
        _context.StationRoutes.Add(busRoute);
        await _context.SaveChangesAsync();
        return busRoute;
    }

    public async Task<StationRouteModel> UpdateRouteAsync(decimal id, StationRouteModel busRoute)
    {
        _context.Entry(busRoute).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return busRoute;
    }

    public async Task<bool> DeleteRouteAsync(decimal busRouteId)
    {
        var busRoute = await _context.StationRoutes.FindAsync(busRouteId);
        if (busRoute == null)
        {
            return false;
        }

        _context.StationRoutes.Remove(busRoute);
        await _context.SaveChangesAsync();
        return true;
    }
}
