using System.ComponentModel.DataAnnotations;

namespace OnlineBookStore.DTO.OrderDTO
{
    public class DeleteOrderDto
    {
        
        public int NoOfBooks { get; set; }

        
        public decimal Total_Price { get; set; }
         
        public DateTime OrderDate { get; set; }

    }
}
