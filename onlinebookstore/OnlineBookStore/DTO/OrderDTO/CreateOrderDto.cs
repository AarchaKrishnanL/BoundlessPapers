using OnlineBookStore.DTO.BookDTO;
using OnlineBookStore.Model;
using System.ComponentModel.DataAnnotations;

namespace OnlineBookStore.DTO.OrderDTO
{
    public class CreateOrderDto
    {
        public string BookName { get; set; }
        public int NoOfBooks { get; set; }


        public int UserId { get; set; }

       // public User user { get; set; }


       // public decimal Total_Price { get; set; }
        
       //public DateTime OrderDate { get; set; }

    }
}
