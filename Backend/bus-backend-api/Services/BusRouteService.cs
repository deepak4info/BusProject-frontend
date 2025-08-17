using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Interface;
using WebApplication1.Models;

namespace WebApplication1.Services
{
    public class BusRouteService : IBusRouteService
    {
        private readonly AppDbContext _context;

        public BusRouteService(AppDbContext context)
        {
            _context = context;
        }

        public Task<List<BusRouteDetailsDto>> GetAvailableBusRoutesAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<List<BusRouteResultModel>> GetBusRoutesBetweenStationsAsync(string FromStation, string ToStation)
        {
            string sql = @$"
              SELECT DISTINCT 
    SR.BusRouteID,B.BusID,B.BusNumber,B.BusType,B.Capacity,SR.ViaRouteName,SR.FromStation,SR.ToStation,SR.DaysAvailable,
  
    (
        SELECT TOP 1 ArrivalTime 
        FROM BusRouteStoppageDetails 
        WHERE StationID = @FromStation AND BusRouteID = SR.BusRouteID
    ) AS SourceArrivalTime,
    
    (
        SELECT TOP 1 ArrivalTime 
        FROM BusRouteStoppageDetails 
        WHERE StationID = @ToStation AND BusRouteID = SR.BusRouteID
    ) AS DestinationArrivalTime
FROM 
    StationRoutes SR
INNER JOIN Bus B ON SR.BusID = B.BusID

WHERE EXISTS (
    SELECT 1 
    FROM BusRouteStoppageDetails 
    WHERE StationID = @FromStation AND BusRouteID = SR.BusRouteID
)
AND EXISTS (
    SELECT 1 
    FROM BusRouteStoppageDetails 
    WHERE StationID = @ToStation AND BusRouteID = SR.BusRouteID
)

AND (
    SELECT SortingID 
    FROM BusRouteStoppageDetails 
    WHERE StationID = @FromStation AND BusRouteID = SR.BusRouteID
) < (
    SELECT SortingID 
    FROM BusRouteStoppageDetails 
    WHERE StationID = @ToStation AND BusRouteID = SR.BusRouteID

                );";

            var fromParam = new SqlParameter("@FromStation", FromStation);
            var toParam = new SqlParameter("@ToStation", ToStation);

            return await _context.Set<BusRouteResultModel>()
                .FromSqlRaw(sql, fromParam, toParam)
                .ToListAsync();
        }


        public async Task<List<BusRouteResultModel2>> GetRouteStationsBetweenAsyncwithRoute(long busRouteId, long fromStationId, long toStationId)
        {

            string sql = @$"
SELECT 
    SD.StationID AS StationID,
    SM.StationName,
    SD.ArrivalTime,
    SD.DepartureTime,
    SD.SortingID,
    SR.BusRouteID,
    B.BusID,
    B.BusNumber,
    B.BusType,
    B.Capacity,
    SR.ViaRouteName,
    SR.FromStation,
    SR.ToStation,
    SR.DaysAvailable,
    (
        SELECT TOP 1 ArrivalTime 
        FROM BusRouteStoppageDetails 
        WHERE StationID = @FromStation AND BusRouteID = SR.BusRouteID
    ) AS SourceArrivalTime,
    (
        SELECT TOP 1 ArrivalTime 
        FROM BusRouteStoppageDetails 
        WHERE StationID = @ToStationId AND BusRouteID = SR.BusRouteID
    ) AS DestinationArrivalTime
FROM 
    BusRouteStoppageDetails SD
INNER JOIN StationsMaster SM ON SD.StationID = SM.StationID
INNER JOIN StationRoutes SR ON SD.BusRouteID = SR.BusRouteID
INNER JOIN Bus B ON B.BusID = SR.BusID
WHERE 
    SD.SortingID >= (
        SELECT TOP 1 SortingID 
        FROM BusRouteStoppageDetails 
        WHERE StationID = @FromStation AND BusRouteID = SR.BusRouteID
    )
    AND SD.SortingID <= (
        SELECT TOP 1 SortingID 
        FROM BusRouteStoppageDetails 
        WHERE StationID = @ToStationId AND BusRouteID = SR.BusRouteID
    )
    AND SR.BusRouteID = @BusRouteId
ORDER BY 
    SD.SortingID             
";

            var fromParam = new SqlParameter("@BusRouteId", busRouteId);
            var toParam = new SqlParameter("@FromStation", fromStationId);
            var toStation = new SqlParameter("@ToStationId", toStationId);

            return await _context.Set<BusRouteResultModel2>()
                .FromSqlRaw(sql, fromParam, toParam, toStation)
                .ToListAsync();
        }
    }
}
