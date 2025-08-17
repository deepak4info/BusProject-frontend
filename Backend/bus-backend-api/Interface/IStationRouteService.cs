using Microsoft.AspNetCore.JsonPatch;
using WebApplication1.Models;

namespace WebApplication1.Interface
{
    public interface IStationRouteService
    {
        Task<IEnumerable<StationRouteModel>> GetAllRoutesAsync();
        Task<StationRouteModel?> GetRouteByIdAsync(decimal id);
        Task<StationRouteModel> AddRouteAsync(StationRouteModel route);
        Task<StationRouteModel?> UpdateRouteAsync(decimal id, StationRouteModel route);
        Task<bool> DeleteRouteAsync(decimal id);
    }
}
