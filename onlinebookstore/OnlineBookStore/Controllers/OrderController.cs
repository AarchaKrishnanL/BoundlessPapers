using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using OnlineBookStore.DTO.OrderDTO;
using OnlineBookStore.Model;
using OnlineBookStore.DTO.BookDTO;
using OnlineBookStore.Repository.IRepository;
using Microsoft.AspNetCore.Authorization;
using OnlineBookStore.Repository.Repos;

namespace OnlineBookStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper;
        private readonly IBooksRepository _booksRepository;
        private readonly IUserRepository _userRepository;
        public OrderController(IOrderRepository orderRepository, IBooksRepository booksRepository, IMapper mapper, IUserRepository userRepository)
        {
            this._orderRepository = orderRepository;
            this._booksRepository = booksRepository;
            this._mapper = mapper;
            this._userRepository = userRepository;
        }


        [HttpGet]
       // [Authorize]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<Order>>> GetAll()
        {
            var get = await _orderRepository.GetAll();
            return Ok(get);
        }


        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult<CreateOrderDto>> Create ([FromBody] CreateOrderDto OrderDto)
        {

           
            var order = _mapper.Map<Order>(OrderDto);
            order.OrderDate = DateTime.Now;
            return Ok(_orderRepository.Create(order));
        }


        [HttpDelete("{id:int}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Order>> DeleteById(int id)
        {
            if (id == null)
            {
                return BadRequest("Id not found");
            }
            await _orderRepository.DeleteById(id);

            return NoContent();
        }

    }
}
