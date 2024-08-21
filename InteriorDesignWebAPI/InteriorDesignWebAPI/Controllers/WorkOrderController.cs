using InteriorDesignWebAPI.Models.Dtos;
using InteriorDesignWebAPI.Services;
using InteriorDesignWebAPI.Services.Interfaces;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InteriorDesignWebAPI.Controllers
{
    [EnableCors("MyPolicy")]
    [ApiController]
    public class WorkOrderController : ControllerBase
    {

        private readonly IWorkOrderService workOrderService;
        private readonly ILogger<WorkOrderController> logger;

        public WorkOrderController(IWorkOrderService _workOrderService, ILogger<WorkOrderController> _logger)
        {
            workOrderService = _workOrderService;
            logger = _logger;
        }


        [HttpGet]
        [Route("api/WorkOrder/GetWorkOrderById")]
        public async Task<ResponseDto> GetWorkOrderById(int id)
        {
            ResponseDto responseDto = new ResponseDto();
            try
            {
                logger.LogInformation("Requested GetWorkOrderById");
                return await workOrderService.GetWorkOrderByIdAsync(id);
            }
            catch (Exception ex)
            {
                responseDto.IsSuccess = false;
                responseDto.Message = ex.Message;
            }
            return responseDto;
        }

        [HttpGet]
        [Route("api/WorkOrder/GetWorkOrdersByRoomIdAsync")]
        public async Task<ResponseDto> GetWorkOrdersByRoomIdAsync(int roomId)
        {
            ResponseDto responseDto = new ResponseDto();
            try
            {
                logger.LogInformation("Requested GetRoomsByProjectId");
                return await workOrderService.GetWorkOrdersByRoomIdAsync(roomId);
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
