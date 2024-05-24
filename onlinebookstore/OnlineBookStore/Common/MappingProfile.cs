using AutoMapper;
using OnlineBookStore.DTO.UserDto;
using OnlineBookStore.DTO.BookDTO;

using OnlineBookStore.Model;
using OnlineBookStore.DTO.OrderDTO;

namespace OnlineBookStore.Common


{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
    
            CreateMap<User, CreateUserDto>().ReverseMap();
            CreateMap<User, PutUserDto>().ReverseMap();
            CreateMap<Books, CreateBookDto>().ReverseMap();
            CreateMap<Books, PutBookDto>().ReverseMap();
            CreateMap<Order, CreateOrderDto>().ReverseMap(); 
            CreateMap<Order, DeleteOrderDto>().ReverseMap();
            CreateMap<User, LoginDTO>().ReverseMap();
        }
    }
    
}
