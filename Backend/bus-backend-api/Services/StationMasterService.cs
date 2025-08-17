using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Interface;
using WebApplication1.Models;

namespace WebApplication1.Services
{
    public class StationMasterService : IStationMasterService
    {
        private readonly AppDbContext _context;

        public StationMasterService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<StationMaster>> GetAllProfilesAsync()
        {
            return await _context.StationsMaster.ToListAsync();
        }

        public async Task<StationMaster> GetProfileByIdAsync(decimal id)
        {
            return await _context.StationsMaster.FindAsync(id);
        }

        public async Task<StationMaster> CreateUserProfileAsync(StationMaster profile)
        {
            _context.StationsMaster.Add(profile);
            await _context.SaveChangesAsync();
            return profile;
        }

        public async Task<StationMaster> UpdateUserProfileAsync(StationMaster profile)
        {
            var existingStation = await _context.StationsMaster.FindAsync(profile.StationID);
            if (existingStation == null)
                return null;

            existingStation.StationName = profile.StationName;
            existingStation.RevenueName = profile.RevenueName;
            existingStation.IsActive = profile.IsActive;
            existingStation.DoneAt = profile.DoneAt;
            existingStation.District = profile.District;
            existingStation.Tahsil = profile.Tahsil;

            await _context.SaveChangesAsync();
            return existingStation;
        }

        public async Task<bool> DeleteUserProfileAsync(decimal id)
        {
            var station = await _context.StationsMaster.FindAsync(id);
            if (station == null)
                return false;

            _context.StationsMaster.Remove(station);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
