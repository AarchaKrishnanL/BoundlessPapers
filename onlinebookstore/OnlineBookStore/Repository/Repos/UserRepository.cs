using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using OnlineBookStore.Context;
using OnlineBookStore.DTO.UserDto;
using OnlineBookStore.Model;
using OnlineBookStore.Repository.IRepository;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace OnlineBookStore.Repository.Repos
{
    public class UserRepository : IUserRepository
    {
        private IConfiguration _config;
        private readonly BookStoreDbContext _dbContext;

        public UserRepository(BookStoreDbContext dbContext, IConfiguration config)
        {
            _dbContext = dbContext;
            _config = config;

        }
        public int GetUserIdByEmail(string email)
        {
            var user = _dbContext.users.FirstOrDefault(u => u.Email == email);
            return user.UserId;
        }
        public async Task Create(User entity)
        {
            await _dbContext.users.AddAsync(entity);
            await Save();

        }

        public async Task DeleteById(User entity)
        {
            _dbContext.users.Remove(entity);
            await Save();
        }

        public async Task<List<User>> GetAll()
        {
            List<User> get = await _dbContext.users.ToListAsync();
            return get;
        }

        public async Task<User> GetById(int id)
        {
            User getbyid = await _dbContext.users.FindAsync(id);
            return getbyid;
        }

        public bool IsUserExsites(string name)
        {
            var result = _dbContext.users.AsQueryable().Where(x => x.UserName.ToLower().Trim() == name.ToLower().Trim()).Any();
            return result;
        }

        public async Task Save()
        {

            await _dbContext.SaveChangesAsync();
        }

        public async Task Update(User entity)
        {
            _dbContext.users.Update(entity);
            await Save();
        }
        public string Login(LoginDTO dto)
        {
            var em = dto.Email;
            var password = dto.Password;
            var currentuser = _dbContext.users.FirstOrDefault(x => x.Email == dto.Email && x.Password == dto.Password);

            string admin_email = "Admin@gmail.com";
            string admin_password = "Admin@123";
            //user part
            if (em != admin_email && password != admin_password)
            {

                if (currentuser == null)
                {
                    Console.WriteLine("Couldn't find the user, create new .insisde user if");
                    return "Couldn't find the user, create new";
                    
                }

                else
                {
                    var email = currentuser.Email;
                    var pass = currentuser.Password;

                    if (em == email && password == pass)
                    {
                        var Securitykey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:Key"]));
                        var Credentials = new SigningCredentials(Securitykey, SecurityAlgorithms.HmacSha256);
                        var claims = new[]
                        {
                   new Claim(ClaimTypes.Email, currentuser.Email),
                   new Claim("UserId", currentuser.UserId.ToString()),

              };

                        var token = new JwtSecurityToken(
                            issuer: _config["JWT:Issuer"],
                            audience: _config["JWT:Audience"],
                            claims: claims,
                            expires: DateTime.Now.AddMinutes(60),
                            signingCredentials: Credentials);

                        var jwttoken = new JwtSecurityTokenHandler().WriteToken(token);
                       
                        return (jwttoken);
                    }
                    else
                    {
                       
                        return "Incorrect Password";

                    }
                }
            }
            //admin part 
            else
            {
                if (dto.Email == admin_email && dto.Password == admin_password)
                {
                    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:Key"]));
                    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
                    //For payload for JWT
                    var claims = new[]
                    {
                new Claim(ClaimTypes.Name,dto.Email),
                new Claim(ClaimTypes.Role,"Admin")
                };

                    var token = new JwtSecurityToken
                        (
                        issuer: _config["JWT:Issuer"],
                        audience: _config["JWT:Audience"],
                        claims: claims,
                        expires: DateTime.Now.AddMinutes(60),
                        signingCredentials: credentials
                        );
                    var jwt = new JwtSecurityTokenHandler().WriteToken(token);
                    Console.WriteLine("For-Admin    " + jwt);
             
                    return jwt;
                }

                else

                        {
                    return "Incorrect Credentails for admin";
                }

            }

        }
    }


   }


