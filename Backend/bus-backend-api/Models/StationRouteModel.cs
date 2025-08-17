using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class StationRouteModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public decimal BusRouteId { get; set; }  // Primary Key

        [Required]
        public decimal BusId { get; set; }  // Foreign Key (to Bus table)

        [ForeignKey("BusId")]
         // ✅ Navigation property for .Include()

        [Required]
        [MaxLength(255)]
        public string FromStation { get; set; }

        [Required]
        [MaxLength(255)]
        public string ToStation { get; set; }

        [MaxLength(255)]
        public string? ViaRouteName { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public DateTime DepartureTime { get; set; }

        public DateTime? DropTime { get; set; }

        public DateTime? CreatedDate { get; set; }

        public DateTime? ModifiedDate { get; set; }

        [Required]
        public int TotalDistance { get; set; }

        [MaxLength(50)]
        public string? DaysAvailable { get; set; }
    }
}
