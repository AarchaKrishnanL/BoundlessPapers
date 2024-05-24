using System.ComponentModel.DataAnnotations;

namespace OnlineBookStore.Model
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required(ErrorMessage = "Username is required")]
        public string UserName { get; set; }

        
        [Required(ErrorMessage = "Password is required")]

        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$", ErrorMessage = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.")]
        public string Password { get; set; }


        [Required(ErrorMessage = "Mobile number is required")]
        [RegularExpression(@"^\d{10}$", ErrorMessage = "Invalid mobile number format")]
        public string MobileNumber { get; set; }

        [Required(ErrorMessage = "Email is required")]
        
        public string Email { get; set; }


    [Required]
        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}
