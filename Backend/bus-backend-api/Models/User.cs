namespace WebApplication1.Models
{
    public class User
    {
        public int? UserID { get; set; }
        public string? Name { get; set; }   
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string? CreatedBy { get; set; } = string.Empty;
        public DateTime? ModifiedDate { get; set; }
        public string? ModifiedBy { get; set; } 
        public bool IsActive { get; set; }
        public string? RoleID { get; set; } = string.Empty;
        public string? Password { get; set; } = string.Empty;
    }

}
