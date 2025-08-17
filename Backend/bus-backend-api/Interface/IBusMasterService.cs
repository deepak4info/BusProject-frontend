using WebApplication1.Models;

namespace WebApplication1.Interface
{
    public interface IBusMasterService
    {
        Task<IEnumerable<BusMasterModel>> GetAllBusesAsync();
        Task<BusMasterModel> GetBusByIdAsync(decimal busId);
        Task<BusMasterModel> AddBusAsync(BusMasterModel bus);
        Task<BusMasterModel> UpdateBusAsync(BusMasterModel bus);
        Task<bool> DeleteBusAsync(decimal busId);
    }
}
