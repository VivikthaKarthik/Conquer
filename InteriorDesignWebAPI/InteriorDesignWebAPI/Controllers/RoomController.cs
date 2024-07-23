using InteriorDesignWebAPI.Models.Dtos;
using InteriorDesignWebAPI.Services;
using InteriorDesignWebAPI.Services.Interfaces;
using InteriorDesignWebAPI.Utilities;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace InteriorDesignWebAPI.Controllers
{
    [EnableCors("MyPolicy")]
    [ApiController]
    public class RoomController : ControllerBase
    {

        private readonly IRoomService roomService;
        private readonly ILogger<RoomController> logger;

        public RoomController(IRoomService _roomService, ILogger<RoomController> _logger)
        {
            roomService = _roomService;
            logger = _logger;
        }


        [HttpGet]
        [Route("api/Room/GetRoomById")]
        public async Task<ResponseDto> GetRoomById(int id)
        {
            ResponseDto responseDto = new ResponseDto();
            try
            {
                logger.LogInformation("Requested GetRoomById");
                return await roomService.GetRoomById(id);
            }
            catch (Exception ex)
            {
                responseDto.IsSuccess = false;
                responseDto.Message = ex.Message;
            }
            return responseDto;
        }

        [HttpGet]
        [Route("api/Room/GetRoomsByProjectId")]
        public async Task<ResponseDto> GetRoomsByProjectId(int projectId)
        {
            ResponseDto responseDto = new ResponseDto();
            try
            {
                logger.LogInformation("Requested GetRoomsByProjectId");
                return await roomService.GetRoomsByProjectId(projectId);
            }
            catch (Exception ex)
            {
                responseDto.IsSuccess = false;
                responseDto.Message = ex.Message;
            }
            return responseDto;
        }

        [HttpPost]
        [Route("api/Project/CreateRoom")]
        public async Task<ResponseDto> CreateRoom(RoomDto room)
        {
            ResponseDto responseDto = new ResponseDto();
            try
            {
                logger.LogInformation("Requested CreateRoom");
                return await roomService.CreateRoomAsync(room);
            }
            catch (Exception ex)
            {
                responseDto.IsSuccess = false;
                responseDto.Message = ex.Message;
            }
            return responseDto;
        }

        [HttpPut]
        [Route("api/Project/UpdateRoom")]
        public async Task<ResponseDto> UpdateRoom(RoomDto room)
        {
            ResponseDto responseDto = new ResponseDto();
            try
            {
                logger.LogInformation("Requested UpdateRoom");
                return await roomService.UpdateRoomAsync(room);
            }
            catch (Exception ex)
            {
                responseDto.IsSuccess = false;
                responseDto.Message = ex.Message;
            }
            return responseDto;
        }

        [HttpDelete]
        [Route("api/Room/DeleteRoom")]
        public async Task<ResponseDto> DeleteRoom(int id)
        {
            ResponseDto responseDto = new ResponseDto();
            try
            {
                logger.LogInformation("Requested DeleteRoom");
                return await roomService.DeleteRoom(id);
            }
            catch (Exception ex)
            {
                responseDto.IsSuccess = false;
                responseDto.Message = ex.Message;
            }
            return responseDto;
        }

    }
}
