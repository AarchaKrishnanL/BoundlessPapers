using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineBookStore.Context;
using OnlineBookStore.DTO.UserDto;
using OnlineBookStore.Model;
using OnlineBookStore.Repository;using OnlineBookStore.Repository.IRepository;
using OnlineBookStore.Repository.Repos;

namespace OnlineBookStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        //private readonly BookStoreDbContext _dbContext;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserController(IUserRepository userRepository, IMapper mapper)
        {
            this._userRepository = userRepository;
            this._mapper = mapper;
        }

        [HttpGet]
       [Authorize]

        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status200OK)]

        public async Task<ActionResult<IEnumerable<User>>> GetAll()
        {
            var get = await _userRepository.GetAll();

            /* if (Get == null)
             {
                 return NotFound();
             }*/
            return Ok(get);

        }


        /*[HttpGet("{id}")]
        //[Authorize(Roles  = "Admin")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status200OK)]

        public async Task<ActionResult> GetById(int id)
        {
            var get = await _userRepository.GetById(id);
            if (get == null)
            {
                return NoContent();
            }
            return Ok(get);
        }*/


        [HttpGet("GetUserIdByEmail")]
        [Authorize]
        public IActionResult GetUserIdByEmail(string email)
        {
            var userId = _userRepository.GetUserIdByEmail(email);

            if (userId == null)
            {
                return NotFound("User not found");
            }

            return Ok(userId);
        }

        [HttpPost("[action]")]
        
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult<CreateUserDto>> Create([FromBody] CreateUserDto UserDto)
        {     
            /*User user = new User();
            user.UserName = UserDto.UserName;
            user.Password = UserDto.Password;
            user.Email = UserDto.Email;
            user.MobileNumber = UserDto.MobileNumber;*/
            
            var user =  _mapper.Map<User>(UserDto);

            var result = _userRepository.IsUserExsites(UserDto.UserName);
            if (result == true)
            {
                return Conflict("Name Already exits");
            }
            else
            {
                await _userRepository.Create(user);
            }

            return Ok("User Registered Successfully");
            //return CreatedAtAction("GetById", new { id = user.UserId }, user);
        }

        [HttpPut("{id:int}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        
        public async Task<ActionResult<PutUserDto>> Update(int id,[FromBody] PutUserDto putUserDto)
            {
            /*User user = new User();
            user.MobileNumber=putUserDto.MobileNumber;
            user.UserName=putUserDto.UserName;
            user.Password=putUserDto.Password;
            user.Email=putUserDto.Email;*/

            var user = _mapper.Map<User>(putUserDto);


            if (user == null || id != user.UserId)
            {
                return BadRequest();
            }
           
            await _userRepository.Update(user);

                return NoContent();
            }

             [HttpDelete("{id:int}")]
             [Authorize]
            [ProducesResponseType(StatusCodes.Status400BadRequest)]
            [ProducesResponseType(StatusCodes.Status204NoContent)]
            [ProducesResponseType(StatusCodes.Status404NotFound)]
            public async Task<ActionResult<User>> DeleteById(int id)
            {
            if (id==0)
            {
                return BadRequest();
            }
                var del = await _userRepository.GetById(id);

            if (del == null)
            {
                return NotFound();
            }
               await _userRepository.DeleteById(del);
                return NoContent();
            }
        
        [HttpPost("Login")]
        
        public IActionResult Login([FromBody] LoginDTO loginDTO)
        {
            var result = _userRepository.Login(loginDTO);
            if(result == "Couldn't find the user, create new")
            {
                return Ok("Couldn't find the user, create new");
            }
            else if(result== "Incorrect Password")
            {
                return Ok("Incorrect Password");
            }
            else if (result == "Incorrect Credentails for admin")
            {
                return Ok("Incorrect Credentails for admin");
            }
            
                return Ok(result);
        }
    }
}
