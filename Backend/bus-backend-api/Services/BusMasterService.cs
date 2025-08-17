using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Interface;
using WebApplication1.Models;

public class BusMasterService : IBusMasterService
{
    private readonly AppDbContext _context;

    public BusMasterService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<BusMasterModel>> GetAllBusesAsync()
    {
        return await _context.Bus.ToListAsync();
    }

    public async Task<BusMasterModel> GetBusByIdAsync(decimal busId)
    {
        return await _context.Bus.FindAsync(busId);
    }

    public async Task<BusMasterModel> AddBusAsync(BusMasterModel bus)
    {
        if (bus == null) throw new ArgumentNullException(nameof(bus));

        _context.Bus.Add(bus);
        await _context.SaveChangesAsync();
        return bus;
    }

    public async Task<BusMasterModel> UpdateBusAsync(BusMasterModel bus)
    {
        if (bus == null) throw new ArgumentNullException(nameof(bus));

        _context.Bus.Update(bus);
        await _context.SaveChangesAsync();
        return bus;
    }

    public async Task<bool> DeleteBusAsync(decimal busId)
    {
        var bus = await _context.Bus.FindAsync(busId);
        if (bus == null) return false;

        _context.Bus.Remove(bus);
        await _context.SaveChangesAsync();
        return true;
    }
}
