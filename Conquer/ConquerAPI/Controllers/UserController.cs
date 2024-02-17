using AutoMapper;
using ConquerAPI.DTOs;
using ConquerAPI.Models.Domain;
using ConquerAPI.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ConquerAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _itemRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<UserController> _logger;

        public UserController(IUserRepository itemRepository, IMapper mapper, ILogger<UserController> logger)
        {
            this._itemRepository = itemRepository;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ResponseDto> Get(string userId)
        {
            ResponseDto _response = new ResponseDto();
            try
            {
                _logger.LogInformation("GetCallVolumeData is called");
                var user = await _itemRepository.GetUser(userId);

                if (user != null)
                {
                    _response.Result = _mapper.Map<UserDto>(user);
                    _response.IsSuccess = true;
                }
                else
                {
                    _response.IsSuccess = false;
                    _response.Message = "Not Found";
                }
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Message = ex.Message;
            }
            return _response;
        }

        [HttpPost]
        public async Task<ResponseDto> Post(UserDto requestDto)
        {
            ResponseDto _response = new ResponseDto();
            try
            {
                var user = _mapper.Map<User>(requestDto);
                var newUser = await _itemRepository.CreateUser(user);
                if (newUser != null)
                {
                    _response.Result = _mapper.Map<UserDto>(newUser);
                    _response.IsSuccess = true;
                }
                else
                {
                    _response.IsSuccess = false;
                    _response.Message = "Internal Server Error";
                }
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Message = ex.Message;
            }
            return _response;
        }

        [HttpPut("{id}")]
        public async Task<ResponseDto> Put(string id, UserDto requestDto)
        {
            ResponseDto _response = new ResponseDto();
            try
            {
                var user = _mapper.Map<User>(requestDto);
                var updatedUser = await _itemRepository.UpdateUser(user);

                if (updatedUser != null)
                {
                    _response.Result = _mapper.Map<UserDto>(updatedUser);
                    _response.IsSuccess = true;
                }
                else
                {
                    _response.IsSuccess = false;
                    _response.Message = "Internal Server Error";
                }
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Message = ex.Message;
            }
            return _response;
        }

        [HttpDelete("{id}")]
        public async Task<ResponseDto> DeleteCallVolume(string id)
        {
            ResponseDto _response = new ResponseDto();
            try
            {
                bool result = await _itemRepository.DeleteUser(id);

                if (!result)
                {
                    _response.IsSuccess = false;
                    _response.Message = "Not Found";
                }
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Message = ex.Message;
            }
            return _response;
        }
    }
}
