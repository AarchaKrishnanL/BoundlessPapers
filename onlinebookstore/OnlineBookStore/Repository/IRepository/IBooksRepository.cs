using OnlineBookStore.Model;

namespace OnlineBookStore.Repository.IRepository
{
    public interface IBooksRepository
    {

        Task<List<Books>> GetAll();
        Task<Books> GetById(int id);
        Task Create(Books entity);
        Task Update(Books entity);
        Task DeleteById(Books entity);

        Task Save();

        bool IsBookExsites(string BookName);
       
    }
}
