using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using QuizAPI.Models;
using QuizAPI.Services.IService;
using QuizAPI.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.OpenApi.Models;

namespace QuizAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Configure DbContext with connection string
            builder.Services.AddDbContext<QuizdbContext>(options =>
                options.UseMySQL(builder.Configuration.GetConnectionString("DefaultConnection")));

            // Dependency Injection
            builder.Services.AddScoped<IAuthService, Auth>();
            builder.Services.AddScoped<ITokenGenerator, TokenGenerator>();
            builder.Services.AddScoped<IQuestionService, QuestionService>();

            // Identity
            builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<QuizdbContext>()
                .AddDefaultTokenProviders();

            // CORS Configuration
            var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(MyAllowSpecificOrigins, policy =>
                {
                    policy.AllowAnyOrigin()
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            // JWT Authentication
            builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection("AuthSettings:JwtOptions"));

            var settingsSection = builder.Configuration.GetSection("AuthSettings:JwtOptions");
            var secret = settingsSection.GetValue<string>("Secret");
            var issuer = settingsSection.GetValue<string>("Issuer");
            var audience = settingsSection.GetValue<string>("Audience");

            var key = Encoding.ASCII.GetBytes(secret);

            builder.Services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidIssuer = issuer,
                    ValidAudience = audience,
                    ValidateAudience = true
                };
            });

            // Swagger Configuration
            builder.Services.AddSwaggerGen(options =>
            {
                // Add the security definition for JWT Bearer token
                options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
                {
                    Description = "Standard Authorization header using the Bearer scheme. Example: \"bearer {token}\"",
                    In = ParameterLocation.Header,
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer",
                    BearerFormat = "JWT",
                });

                // Apply the security requirement globally for all endpoints
                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "oauth2"
                            }
                        },
                        new string[] {}
                    }
                });
            });

            builder.Services.AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
                options.JsonSerializerOptions.WriteIndented = true;
            });

            builder.Services.AddEndpointsApiExplorer();

            var app = builder.Build();

            app.UseCors(MyAllowSpecificOrigins);

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(options =>
                {
                    // Swagger UI will show the Authorization button for Bearer Token
                });
            }

            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseAuthorization();
            app.MapControllers();

            app.Run();
        }
    }
}
