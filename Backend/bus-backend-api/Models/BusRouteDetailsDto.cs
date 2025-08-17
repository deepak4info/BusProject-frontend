namespace WebApplication1.Models
{
    public class BusRouteDetailsDto
    {
        public int BusRouteID { get; set; }
        public int BusID { get; set; }
        public string BusNumber { get; set; }
        public string BusType { get; set; }
        public int Capacity { get; set; }
        public string ViaRouteName { get; set; }
        public string FromStation { get; set; }
        public string ToStation { get; set; }
        public string DaysAvailable { get; set; }
        public string SourceArrivalTime { get; set; }
        public string DestinationArrivalTime { get; set; }
    }
}
