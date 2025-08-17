using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class StationMaster
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Ensures auto-increment behavior
        public decimal StationID { get; set; } // Primary Key (numeric(18,0))

        [Required]
        [StringLength(255)]
        public string StationName { get; set; } // Required, max length 255

        [StringLength(255)]
        public string RevenueName { get; set; } // Nullable

        public bool IsActive { get; set; } = true; // Default to true

        public DateTime? DoneAt { get; set; } // Nullable datetime

        [Required]
        [StringLength(50)]
        public string District { get; set; } // Required, max length 50

        [Required]
        [StringLength(50)]
        public string Tahsil { get; set; } // Required, max length 50

    }
}
