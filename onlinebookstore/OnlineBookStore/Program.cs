using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using OnlineBookStore.Common;
using OnlineBookStore.Context;
using OnlineBookStore.Repository.IRepository;
using OnlineBookStore.Repository.Repos;
using System.Text;


 var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            #region Configure Database

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddDbContext<BookStoreDbContext>(item => item.UseSqlServer(builder.Configuration.GetConnectionString("DBConnection")));
            #endregion

            #region Configure AutoMapper

            builder.Services.AddAutoMapper(typeof(MappingProfile));

            #endregion

            #region REPO
            builder.Services.AddScoped<IUserRepository,UserRepository>();
            builder.Services.AddScoped<IBooksRepository, BooksRepository>();
            builder.Services.AddScoped<IOrderRepository, OrderRepository>();
            #endregion
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidAudience = builder.Configuration["JWT:Audience"],
            ValidIssuer = builder.Configuration["JWT:Issuer"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"]))
        };
    });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
       
            app.UseHttpsRedirection();
            app.UseCors(c => c.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());
            app.UseAuthentication();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
