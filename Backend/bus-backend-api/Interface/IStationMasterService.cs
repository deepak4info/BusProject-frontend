using WebApplication1.Models;

namespace WebApplication1.Interface
{
    public interface IStationMasterService
    {
        Task<IEnumerable<StationMaster>> GetAllProfilesAsync();
        Task<StationMaster> GetProfileByIdAsync(decimal id);
        Task<StationMaster> CreateUserProfileAsync(StationMaster profile);
        Task<StationMaster> UpdateUserProfileAsync(StationMaster profile);
        Task<bool> DeleteUserProfileAsync(decimal id);
    }
}
