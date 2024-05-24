using OnlineBookStore.Model;

namespace OnlineBookStore.Repository.IRepository
{
    public interface IOrderRepository
    {
        // Task<Books> Create(string bookName);
        //Task<Books> GetBookByName(string bookName);
        Task<List<Order>> GetAll();
        //Task<Books> GetByBookName(string BookName);
        Task<User> GetById(int id);
        Order Create(Order entity);
        Task DeleteById(int Orderid);
        Task Save();
    }
}
