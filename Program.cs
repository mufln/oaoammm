using hihihiha.Context;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;

namespace hihihiha;
class Program
{
    static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        builder.Services.AddCors(options =>
        {
            options.AddPolicy(name: "oaoammm",
                policy  =>
                {
                    policy.WithOrigins("http://localhost:3001/",
                        "http://localhost:3000/", "http://localhost").AllowAnyMethod();
                });
        });
        
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddDbContext<ApplicationContext>(opts => opts.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
        
        builder.Services.AddControllers();
        // builder.Services.AddControllersWithViews(options =>
        // {
        //     options.Filters.Add(new Microsoft.AspNetCore.Mvc.ValidateAntiForgeryTokenAttribute());
        // });
        
        builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
            .AddCookie(options =>
            {
                options.LoginPath = "/Auth";
            });
        builder.Services.AddCors(options =>
        {
            options.AddPolicy(name: "oaoammm",
                policy  =>
                {
                    policy.WithOrigins("http://localhost:3001",
                        "http://localhost:3000").AllowAnyMethod().AllowAnyHeader().AllowCredentials();
                });
        });
        var app = builder.Build();
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        app.UseCors("oaoammm");
        app.UseHttpsRedirection();
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllers();
        // app.UseCors("oaoammm");
        app.Run();
    }
}
