using WebApplication1.Services;

namespace WebApplication1.Models
{
    public class BusRouteResultModel2
    {
        public decimal BusRouteID { get; set; }          // numeric(18,0)
        public decimal BusID { get; set; }               // numeric(18,0)
        public string BusNumber { get; set; }
        public string BusType { get; set; }
        public int Capacity { get; set; }                // int
        public string ViaRouteName { get; set; }
        public string FromStation { get; set; }
        public string ToStation { get; set; }
        public string? StationName { get; set; }
        public string DaysAvailable { get; set; }
        public string ArrivalTime { get; set; }     // varchar(20)
        public string DepartureTime { get; set; } // varchar(20) 

    }
}

