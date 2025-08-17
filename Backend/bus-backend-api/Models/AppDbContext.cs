using Microsoft.EntityFrameworkCore;

namespace WebApplication1.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> UserRegistration { get; set; }
        public DbSet<StationRouteModel> StationRoutes { get; set; }
        public DbSet<StationMaster> StationsMaster { get; set; }
        public DbSet<BusMasterModel> Bus { get; set; }
        public DbSet<BusRouteStoppageDetailsModel> BusRouteStoppageDetails { get; set; }

        public DbSet<BusRouteResultModel> BusRouteResults { get; set; }
        public DbSet<BusRouteResultModel2> BusRouteResults2 { get; set; }

        // Removed: public DbSet<BusRouteStoppageDto> BusRouteStoppageDto { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // If you're using BusRouteStoppageDto in raw SQL queries, keep it as keyless
            modelBuilder.Entity<BusRouteStoppageDto>().HasNoKey(); // Optional: only if needed
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<BusRouteResultModel>().HasNoKey(); // Because it's a custom query result
            modelBuilder.Entity<BusRouteResultModel2>().HasNoKey();

        }
    }
}
