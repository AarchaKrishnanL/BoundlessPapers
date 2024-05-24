using System.ComponentModel.DataAnnotations;

namespace OnlineBookStore.DTO.UserDto
{
    public class CreateUserDto
    {

       // public int UserId { get; set; }
        public string UserName { get; set; }   
        public string Password { get; set; }

        public string MobileNumber { get; set; }
        public string Email { get; set; }
    }
}
