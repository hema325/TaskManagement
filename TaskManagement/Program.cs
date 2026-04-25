using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;
using System.Reflection;
using System.Text;
using TaskManagement.Data;
using TaskManagement.Enums;
using TaskManagement.Extensions;
using TaskManagement.Filters;
using TaskManagement.Helpers;
using TaskManagement.Services.CurrentUser;
using TaskManagement.Services.JwtGenerator;
using TaskManagement.Settings;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services
    .AddSwagger()
    .AddOpenApi();

// db
builder.Services
    .AddDbContext<AppDbContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("Sql")));

// auth
builder.AddAuth();

// services
builder.Services
    .AddHttpContextAccessor()
    .AddAutoMapper(_ => { }, Assembly.GetExecutingAssembly());

// DI
builder.Services
    .AddScoped<AppDbContextInitializer>()
    .AddScoped<ICurrentUserService, CurrentUserService>()
    .AddScoped<ITokenGeneratorService, TokenGeneratorService>();

// configs
builder.Services
    .Configure<JwtSettings>(builder.Configuration.GetSection(JwtSettings.Section))
    .Configure<ApiBehaviorOptions>(opt=>
    {
        opt.InvalidModelStateResponseFactory = (context) =>
        {
            var errors = context.ModelState.Values
                        .SelectMany(v => v.Errors)
                        .Select(e => e.ErrorMessage);

            var response = Result.Error(errors);
            return new BadRequestObjectResult(response);
        };
    });

// cors
builder.Services.AddCors(opt =>
{
    opt.AddDefaultPolicy(builder =>
    {
        builder
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowAnyOrigin();
    });
});

builder.Services
    .AddExceptionHandler<GlobalExceptionHandler>()
    .AddProblemDetails();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStatusCodePagesWithReExecute("/errors/{0}");

app.UseCors();
app.UseHttpsRedirection();

app.UseExceptionHandler();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

await app.InitializeDbAsync();

app.Run();
