
using hihihiha.Context;
using Microsoft.EntityFrameworkCore;

class Program
{
    static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddDbContext<ApplicationContext>(opts => opts.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
        var app = builder.Build();
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        app.UseHttpsRedirection();
        app.Run();
    }
}
