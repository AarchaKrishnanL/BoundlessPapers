using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace OnlineBookStore.Model
{
    public class Books
    {
        [Key]
        public int BookId { get; set; }

        [Required(ErrorMessage = "BookName is required")]
        public string BookName { get; set; }

        [Required(ErrorMessage = "BookAuthor is required")]
        public string BookAuthor { get; set; }

        [Required(ErrorMessage = " BookDescription is required")]
        public string BookDescription { get; set; }

        [Required(ErrorMessage = "Price is required")]
        public decimal Price { get; set; }

        [Required(ErrorMessage = "Image is required")]
        public string ImageURl {  get; set; } 
        
    }
}
