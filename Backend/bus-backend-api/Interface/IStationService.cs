using WebApplication1.Models;
using static System.Collections.Specialized.BitVector32;

namespace WebApplication1.Interface
{
    public interface IStationService
    {
        Task<List<StationMaster>> GetStationsBetweenAsync(string fromStation, string toStation);
    }
}
