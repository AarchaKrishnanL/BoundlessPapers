using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineBookStore.Context;
using OnlineBookStore.DTO.BookDTO;
using OnlineBookStore.Model;
using OnlineBookStore.Repository;
using OnlineBookStore.Repository.IRepository;
using OnlineBookStore.Repository.Repos;



namespace OnlineBookStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IBooksRepository _booksRepository;
        private readonly IMapper _mapper;
        public BooksController(IBooksRepository booksRepository, IMapper mapper)
        {
            this._booksRepository = booksRepository;
            this._mapper = mapper;
        }
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<Books>>> GetAll () 
        {
            var get = await _booksRepository.GetAll();
            return Ok(get);
        }

        [HttpGet("{Id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status200OK)]
            public async Task<ActionResult> GetById(int Id)
            {
                var get = await _booksRepository.GetById(Id);
                if (get == null)
                {
                    return NoContent();
                }
                return Ok(get);
            }
        

        [HttpPost]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult<CreateBookDto>> Create([FromBody] CreateBookDto BookDto)
        {
            
            var book = _mapper.Map<Books>(BookDto);

            var result = _booksRepository.IsBookExsites(BookDto.BookName);
            if (result == true)
            {
                return Conflict("Name Already exits");
            }
            else
            {
                await _booksRepository.Create(book);
            }

            return CreatedAtAction("GetById", new { id = book.BookId }, book);
        }




        [HttpPut("UpdateId/{id}")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public async Task<ActionResult<PutBookDto>> Update(int id, [FromBody] PutBookDto putBookDto)
        {
            var books = _mapper.Map<Books>(putBookDto);

            if (books == null || id != books.BookId)
            {
                return BadRequest();
            }

            

            await _booksRepository.Update(books);
            return NoContent();
        }

        [HttpDelete("DeletById/{id}")]
        [Authorize(Roles ="Admin")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public async Task<ActionResult<User>> DeleteById(int id)
        {
            if (id == 0)
            {
                return BadRequest();
            }
            var del = await _booksRepository.GetById(id);

            if (del == null)
            {
                return NotFound();
            }
            await _booksRepository.DeleteById(del);
            return NoContent();
        }

    }
        

    
      
       
            
    
}
