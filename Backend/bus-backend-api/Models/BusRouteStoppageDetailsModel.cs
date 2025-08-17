using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class BusRouteStoppageDetailsModel
    {
        internal string StationName;

        [Key]  // Define primary key
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // If auto-increment
        public decimal StopID { get; set; }  // Numeric(18,0) mapped to decimal
        public decimal SortingID { get; set; }
        public decimal BusRouteID { get; set; }
        public decimal BusID { get; set; }   // Numeric(18,0) mapped to decimal
        public decimal StationID { get; set; } // Numeric(18,0) mapped to decimal
        public string? ArrivalTime { get; set; } // Varchar(20), nullable
        public string? DepartureTime { get; set; } // Varchar(20), nullable
        public bool isActive { get; set; }  // Bit mapped to bool
        public DateTime DoneAt { get; set; } // Datetime
    }
}
