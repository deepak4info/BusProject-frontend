using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

//api/BusMaster' 

namespace WebApplication1.Models
{

    public class BusMasterModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Ensures auto-increment if BUSID is an identity column
        public decimal BUSID { get; set; } // Changed from decimal to long for numeric(18,0)

        [Required]
        [StringLength(50)]
        public string BusNumber { get; set; } // nvarchar(50) -> string

        [StringLength(100)]
        public string BusType { get; set; } // Nullable (Checked in SQL)

        public int? Capacity { get; set; } // Nullable int (Checked in SQL)

        public DateTime? CreatedDate { get; set; } // Nullable datetime

        public bool? IsActive { get; set; } // Nullable bit (Checked in SQL)

    }
}
