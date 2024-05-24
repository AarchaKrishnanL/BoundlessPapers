using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace OnlineBookStore.Model
{
    public class Order 
    {
        [Key]
        public int OrderId { get; set; }

        [Required]
        [ForeignKey("user")]
         public int UserId { get; set; }
         public User user { get; set; }

        [Required(ErrorMessage = "BookName is required")]
        public string BookName { get; set; }

        [Required(ErrorMessage = "NoOfBooks is required")]
        public int NoOfBooks { get; set; }

        /*[Required(ErrorMessage = "Price is required")]
        public decimal Price { get; set; }*/

        [Required(ErrorMessage = "Total_Price is required")]
        public decimal Total_Price { get; set; }
        [Required(ErrorMessage = "DateTime is required")]
        public DateTime OrderDate { get; set; }


    }
}
