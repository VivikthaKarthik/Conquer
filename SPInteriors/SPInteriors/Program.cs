using SPInteriors.Components;
using SPInteriors.Models.Domain;
using SPInteriors.Services.Implementations;
using SPInteriors.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using SPInteriors;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Components.Server.ProtectedBrowserStorage;
using Microsoft.AspNetCore.Components.Authorization;
using SPInteriors.Authentication;
using Microsoft.Identity.Client;
using Microsoft.Identity.Client.Extensibility;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNet.Identity;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthenticationCore();
builder.Services.AddSingleton<HeaderService>();
builder.Services.AddScoped<ProtectedSessionStorage>();
builder.Services.AddScoped<AuthenticationStateProvider, CustomAuthenticationStateProvider>();
builder.Services.AddScoped<IFileUploadService, FileUploadService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IQuotationService, QuotationService>();
builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.AddScoped<IRoomService, RoomService>();
builder.Services.AddScoped<ICommonService, CommonService>();
builder.Services.AddScoped<IWorkOrderService, WorkOrderService>();
builder.Services.AddScoped<IClientService, ClientService>();
builder.Services.AddScoped<IPortfolioService, PortfolioService>();

builder.Services.AddHttpContextAccessor();
//IMapper mapper = MapperConfig.RegisterMaps().CreateMapper();
//builder.Services.AddSingleton(mapper);
//builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// Add services to the container.
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

//builder.Services.AddAuthentication(options =>
//{
//    options.DefaultAuthenticateScheme = DefaultAuthenticationTypes.ApplicationCookie;
//});
//builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
//    .AddCookie(options =>
//    {
//        options.Cookie.Name = "auth-token";
//        options.LoginPath = "/login";
//        options.Cookie.MaxAge = TimeSpan.FromMinutes(30);
//        options.AccessDeniedPath = "/accessdenied";
//    });
//builder.Services.AddAuthorization();
//builder.Services.AddCascadingAuthenticationState();

builder.Services.AddDbContext<InteriorDesignContext>((sp, options) =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("SqlConnectionString")).AddInterceptors();
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseStaticFiles();
app.UseAntiforgery();
app.UseAuthentication();
app.UseAuthorization();
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();

app.Run();
