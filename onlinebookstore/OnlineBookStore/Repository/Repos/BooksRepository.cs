using Microsoft.EntityFrameworkCore;
using OnlineBookStore.Context;
using OnlineBookStore.Model;
using OnlineBookStore.Repository.IRepository;


namespace OnlineBookStore.Repository.Repos
{
    public class BooksRepository : IBooksRepository
    {
        private readonly BookStoreDbContext _dbContext;

        public BooksRepository(BookStoreDbContext dbContext)
        {
            _dbContext = dbContext;

        }
        public async Task Create(Books entity)
        {
            await _dbContext.books.AddAsync(entity);
            await Save();
        }

        public async Task DeleteById(Books entity)
        {
            _dbContext.books.Remove(entity);
            await Save();
        }

        public async Task<List<Books>> GetAll()
        {
            List<Books> Get = await _dbContext.books.ToListAsync();
            return Get;
        }

        public async Task<Books> GetById(int id)
        {
            Books getbyid = await _dbContext.books.FindAsync(id);
            return getbyid;
            
        }

        public bool IsBookExsites(string BookName)
        {
            var result = _dbContext.books.AsQueryable().Where(x => x.BookName.ToLower().Trim() == BookName.ToLower().Trim()).Any();
            return result;
        }

        public async Task Save()
        {
            await _dbContext.SaveChangesAsync();
        }

        public async Task Update(Books entity)
        {
            _dbContext.books.Update(entity);
            await Save();
        }
    }
}
