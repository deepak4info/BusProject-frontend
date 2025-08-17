using WebApplication1.Models;

namespace WebApplication1.Interface
{
    public interface IBusRouteStoppageService
    {
        Task<IEnumerable<BusRouteStoppageDetailsModel>> GetAllStoppagesAsync();
        Task<BusRouteStoppageDetailsModel> GetStoppageByIdAsync(decimal stopId);
        Task AddStoppageAsync(BusRouteStoppageDetailsModel stoppage);
        Task UpdateStoppageAsync(BusRouteStoppageDetailsModel stoppage);
        Task DeleteStoppageAsync(decimal stopId);

    }
}
