using Microsoft.EntityFrameworkCore;
using OnlineBookStore.Context;
using OnlineBookStore.DTO.OrderDTO;
using OnlineBookStore.DTO.BookDTO;
using OnlineBookStore.Model;
using OnlineBookStore.Repository.IRepository;
using OnlineBookStore.DTO.UserDto;

namespace OnlineBookStore.Repository.Repos
{
    public class OrderRepository : IOrderRepository

    {

        //private IConfiguration _config;
        private readonly BookStoreDbContext _dbContext;
        public OrderRepository(BookStoreDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        

        public async Task Save()
        {

            await _dbContext.SaveChangesAsync();
        }

        public Order Create(Order entity)
        {
           
            var result =  _dbContext.books.Where(x => x.BookName == entity.BookName).FirstOrDefault();
            string bnm = result.BookName;
            decimal bpr=result.Price;
            if(result != null) {
                entity.Total_Price = Convert.ToDecimal(entity.NoOfBooks) * result.Price;
                 _dbContext.orders.Add(entity);
                _dbContext.SaveChanges();
            }

            return entity;
            
        }

        public async Task DeleteById(int Orderid)
        {
            var res = _dbContext.orders.Find(Orderid);

            if(res!=null)
            {
                _dbContext.orders.Remove(res);
            }


            await Save();
        }

        public async Task<List<Order>> GetAll()
        {
            List<Order> details = await _dbContext.orders.ToListAsync();
            //Console.WriteLine(details);
            return details;
        }

        /* public async Task<Order> GetById(int id)
         {

             Order getbyid = await _dbContext.orders.FindAsync(id);

             return getbyid;
         }*/


        public async Task<User> GetById(int id)
        {
           
           /* var password = dto.Password;*/
            var currentuser = _dbContext.orders.FirstOrDefault(x => x.UserId == id);

            User user = await _dbContext.users
           .Include(u => u.Orders)
           .FirstOrDefaultAsync(u => u.UserId == id);

            return user;
        }

        /* public Task<Order> GetById(int id)
         {
             throw new NotImplementedException();
         }*/

        /*public async Task<Books> GetByBookName(string BookName)
        {
            User getbyid = await _dbContext.books.FindAsync(BookName);
            return getbyid;
        }*/

        /*public async Task<Books> GetByBookName(string BookName)
        {

            var res = _dbContext.books.FirstOrDefault(x => x.BookName == BookName);

            Books getbyBookName = await _dbContext.books.Where(b=>b.BookName.ToLower().Trim().Equals(BookName.ToLower().Trim())).FirstOrDefaultAsync();
            return res;
        }*/
    }
}
