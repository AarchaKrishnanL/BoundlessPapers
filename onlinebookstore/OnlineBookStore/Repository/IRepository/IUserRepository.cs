using OnlineBookStore.DTO.UserDto;
using OnlineBookStore.Model;


namespace OnlineBookStore.Repository.IRepository
{
    public interface IUserRepository
    {
        Task<List<User>> GetAll();

        Task<User> GetById(int id);

        Task Create(User entity);
        Task Update(User entity);
        Task DeleteById(User entity);

        Task Save();

        bool IsUserExsites(string name);

        string Login(LoginDTO dto);
        public int GetUserIdByEmail(string email);


    }
}
