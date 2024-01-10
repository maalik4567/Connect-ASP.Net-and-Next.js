using CrudApp.Models;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddControllers();

// Configure the DbContext and add it to the services
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer("DefaultConnection"));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

// Configure CORS
app.UseCors(builder =>
{
    builder.WithOrigins("http://localhost:3000")
           .AllowAnyHeader()
           .AllowAnyMethod();
});



app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.Run();
