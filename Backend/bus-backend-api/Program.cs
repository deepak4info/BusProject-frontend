using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using WebApplication1.Interface;
using WebApplication1.Models;
using WebApplication1.Services;

var builder = WebApplication.CreateBuilder(args);

// ✅ Corrected CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        policy => policy
         .WithOrigins("https://busprojectapi-dbd7brafa0hhgch8.uaenorth-01.azurewebsites.net/api/BusRoute") // change to your actual Angular dev URL
            .AllowAnyOrigin() // Allow only Angular app
            .AllowAnyMethod()
        .AllowAnyHeader());
});

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ✅ Database connection
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));

// ✅ Register services
builder.Services.AddScoped<IUserInterface, UserService>();
builder.Services.AddScoped<IStationRouteService, StationRouteService>();
builder.Services.AddScoped<IStationMasterService, StationMasterService>();
builder.Services.AddScoped<IBusMasterService, BusMasterService>();
builder.Services.AddScoped<IBusRouteStoppageService, BusRouteStoppageService>();
builder.Services.AddScoped<IStationService, StationService>();
builder.Services.AddScoped<IBusRouteService, BusRouteService>();


var app = builder.Build();

// ✅ Enable CORS **before** other middleware
app.UseCors("AllowAngularApp");

app.UseHttpsRedirection();
app.UseAuthorization();


    app.UseSwagger();
    app.UseSwaggerUI();


app.MapControllers();

app.Run();