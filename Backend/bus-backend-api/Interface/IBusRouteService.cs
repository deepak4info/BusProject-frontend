using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Interface
{
    public interface IBusRouteService
    {
       Task<List<BusRouteDetailsDto>> GetAvailableBusRoutesAsync();
        Task<List<BusRouteResultModel>> GetBusRoutesBetweenStationsAsync(string sourceStationId, string destinationStationId);

        Task<List<BusRouteResultModel2>> GetRouteStationsBetweenAsyncwithRoute(long busRouteId, long fromStationId, long toStationId);
    }
}
