using InteriorDesignWebAPI.Models.Dtos;
using InteriorDesignWebAPI.Services;
using InteriorDesignWebAPI.Services.Interfaces;
using InteriorDesignWebAPI.Utilities;
using Microsoft.AspNetCore.Authorization;
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
        [Route("api/WorkOrder/GetWorkOrderImages")]
        public async Task<ResponseDto> GetWorkOrderImages(int id)
        {
            ResponseDto responseDto = new ResponseDto();
            try
            {
                logger.LogInformation("Requested GetWorkOrderImages");
                return await workOrderService.GetWorkOrderImages(id);
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

        [HttpGet]
        [Route("api/WorkOrder/GetWorkOrderPartByIdAsync")]
        public async Task<ResponseDto> GetWorkOrderPartByIdAsync(int partId)
        {
            ResponseDto responseDto = new ResponseDto();
            try
            {
                logger.LogInformation("Requested GetWorkOrderPartByIdAsync");
                return await workOrderService.GetWorkOrderPartByIdAsync(partId);
            }
            catch (Exception ex)
            {
                responseDto.IsSuccess = false;
                responseDto.Message = ex.Message;
            }
            return responseDto;
        }

        [HttpGet]
        [Route("api/WorkOrder/GetWorkOrderProperties")]
        public async Task<ResponseDto> GetWorkOrderProperties()
        {
            ResponseDto responseDto = new ResponseDto();
            try
            {
                logger.LogInformation("Requested GetWorkOrderProperties");
                return await workOrderService.GetWorkOrderPropertiesAsync();
            }
            catch (Exception ex)
            {
                responseDto.IsSuccess = false;
                responseDto.Message = ex.Message;
            }
            return responseDto;
        }


        [HttpGet]
        [Route("api/WorkOrder/GetWorkOrderItemTypes")]
        public async Task<ResponseDto> GetWorkOrderItemTypes()
        {
            ResponseDto responseDto = new ResponseDto();
            try
            {
                logger.LogInformation("Requested GetWorkOrderItemTypes");
                return await workOrderService.GetWorkOrderItemTypesAsync();
            }
            catch (Exception ex)
            {
                responseDto.IsSuccess = false;
                responseDto.Message = ex.Message;
            }
            return responseDto;
        }

        [HttpPost]
        [Route("api/WorkOrder/SaveWorkOrder")]
        public async Task<ResponseDto> SaveWorkOrder([ModelBinder(BinderType = typeof(JsonModelBinder))] SaveWorkOrderDto workOrder, List<IFormFile> images)
        {
            ResponseDto responseDto = new ResponseDto();
            try
            {
                logger.LogInformation("Requested SaveWorkOrder");
                return await workOrderService.SaveWorkOrder(workOrder, images);
            }
            catch (Exception ex)
            {
                responseDto.IsSuccess = false;
                responseDto.Message = ex.Message;
            }
            return responseDto;
        }

        [HttpPost]
        [Route("api/WorkOrder/SaveRoomType")]
        public async Task<ResponseDto> SaveRoomType(RoomTypeDto roomType)
        {
            ResponseDto responseDto = new ResponseDto();
            try
            {
                logger.LogInformation("Requested SaveRoomType");
                return await workOrderService.SaveRoomType(roomType);
            }
            catch (Exception ex)
            {
                responseDto.IsSuccess = false;
                responseDto.Message = ex.Message;
            }
            return responseDto;
        }

        [HttpPost]
        [Route("api/WorkOrder/SaveWorkOrderItem")]
        public async Task<ResponseDto> SaveWorkOrderItem(WorkOrderItemDto workOrderItem)
        {
            ResponseDto responseDto = new ResponseDto();
            try
            {
                logger.LogInformation("Requested SaveWorkOrderItem");
                return await workOrderService.SaveWorkOrderItem(workOrderItem);
            }
            catch (Exception ex)
            {
                responseDto.IsSuccess = false;
                responseDto.Message = ex.Message;
            }
            return responseDto;
        }

        [HttpPost]
        [Route("api/WorkOrder/SaveWorkOrderPart")]
        public async Task<ResponseDto> SaveWorkOrderPart(UpdateWorkOrderPartDto part)
        {
            ResponseDto responseDto = new ResponseDto();
            try
            {
                logger.LogInformation("Requested SaveWorkOrderPart");
                return await workOrderService.SaveWorkOrderPart(part);
            }
            catch (Exception ex)
            {
                responseDto.IsSuccess = false;
                responseDto.Message = ex.Message;
            }
            return responseDto;
        }

        [HttpPost]
        [Route("api/WorkOrder/SavePropertyField")]
        public async Task<ResponseDto> SavePropertyField(NewPropertyFieldDto propertyFieldDto)
        {
            ResponseDto responseDto = new ResponseDto();
            try
            {
                logger.LogInformation("Requested SavePropertyField");
                return await workOrderService.SavePropertyField(propertyFieldDto);
            }
            catch (Exception ex)
            {
                responseDto.IsSuccess = false;
                responseDto.Message = ex.Message;
            }
            return responseDto;
        }

        [HttpDelete]
        [Route("api/WorkOrder/DeleteWorkOrder")]
        public async Task<ResponseDto> DeleteWorkOrder(int id)
        {
            ResponseDto responseDto = new ResponseDto();
            try
            {
                logger.LogInformation("Requested SavePropertyField");
                return await workOrderService.DeleteWorkOrder(id);
            }
            catch (Exception ex)
            {
                responseDto.IsSuccess = false;
                responseDto.Message = ex.Message;
            }
            return responseDto;
        }

        [HttpDelete]
        [Route("api/WorkOrder/DeleteWorkOrderPart")]
        public async Task<ResponseDto> DeleteWorkOrderPart(int id)
        {
            ResponseDto responseDto = new ResponseDto();
            try
            {
                logger.LogInformation("Requested DeleteWorkOrderPart");
                return await workOrderService.DeleteWorkOrderPart(id);
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
