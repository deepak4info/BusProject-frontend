namespace WebApplication1.Models
{

    public class BusRouteStoppageDto
    {
        public decimal StopID { get; set; }
        public decimal BusID { get; set; }
        public decimal StationID { get; set; }
        public string StationName { get; set; }
        public string ArrivalTime { get; set; }
        public string DepartureTime { get; set; }
        public bool IsActive { get; set; }
        public DateTime DoneAt { get; set; }
        public decimal BusRouteID { get; set; }
        public decimal SortingID { get; set; }
        public string RevenueName { get; set; }
        public string District { get; set; }
        public string Tahsil { get; set; }
        public string FromStation { get; set; }
        public string ToStation { get; set; }
        public string ViaRouteName { get; set; }
        public DateTime Date { get; set; }
        public string BusNumber { get; set; }
        public string BusType { get; set; }
        public decimal Capacity { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool IsActiveBus { get; set; }
        public decimal TotalDistance { get; set; }
        public string DaysAvailable { get; set; }
    }
}
