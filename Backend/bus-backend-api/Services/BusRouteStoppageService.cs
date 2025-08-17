using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Interface;
using WebApplication1.Models;

namespace WebApplication1.Services
{
    public class BusRouteStoppageService : IBusRouteStoppageService
    {
        private readonly AppDbContext _context;

        public BusRouteStoppageService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<BusRouteStoppageDetailsModel>> GetAllStoppagesAsync()
        {
            return await _context.BusRouteStoppageDetails.ToListAsync();
        }

        public async Task<BusRouteStoppageDetailsModel> GetStoppageByIdAsync(decimal stopId)
        {
            return await _context.BusRouteStoppageDetails.FindAsync(stopId);
        }

        public async Task AddStoppageAsync(BusRouteStoppageDetailsModel stoppage)
        {
            _context.BusRouteStoppageDetails.Add(stoppage);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateStoppageAsync(BusRouteStoppageDetailsModel stoppage)
        {
            _context.BusRouteStoppageDetails.Update(stoppage);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteStoppageAsync(decimal stopId)
        {
            var stoppage = await _context.BusRouteStoppageDetails.FindAsync(stopId);
            if (stoppage != null)
            {
                _context.BusRouteStoppageDetails.Remove(stoppage);
                await _context.SaveChangesAsync();
            }
        }
    }
}
