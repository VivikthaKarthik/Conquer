using InteriorDesignWebAPI.Models.Dtos;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Mvc;

namespace InteriorDesignWebAPI.Services.Interfaces
{
    public interface IWorkOrderService
    {
        Task<ResponseDto> GetWorkOrderByIdAsync(int id);
        Task<ResponseDto> GetWorkOrdersByRoomIdAsync(int roomId);
        Task<ResponseDto> GetWorkOrderItemImage(int id);
        Task<ResponseDto> CreateWorkOrderAsync(WorkOrderDto data);
        Task<ResponseDto> UpdateWorkOrderAsync(WorkOrderDto data);
        //Task<List<ListItemDto>> GetWorkOrderImagesAsync(int workOrderId);
        //Task<List<WorkOrderPropertyDto>> GetWorkOrderPropertiesAsync();
        //Task<WorkOrderDto> GetWorkOrderAsync(int id);
        //Task<WorkOrderPartDto> GetWorkOrderPartsAsync(int id);
        //Task<bool> CreateWorkOrderPartAsync(WorkOrderPartDto data, List<WorkOrderPropertyDto> properties);
        //Task<bool> UpdateWorkOrderPartAsync(WorkOrderPartDto data, List<WorkOrderPropertyDto> properties);
        Task<ResponseDto> DeleteWorkOrderPart(int id);
        Task<ResponseDto> DeleteWorkOrder(int id);
        //Task<bool> CreateWorkOrderItemAsync(IBrowserFile image, int roomId, CreateWorkOrderItemDto data);
        Task<ResponseDto> GetWorkOrderPartByIdAsync(int id);
        Task<ResponseDto> GetWorkOrderPropertiesAsync();
        Task<ResponseDto> GetWorkOrderItemTypesAsync();
        Task<ResponseDto> SaveWorkOrderPart(UpdateWorkOrderPartDto part);
        Task<ResponseDto> SaveWorkOrderItem(WorkOrderItemDto data);
        Task<ResponseDto> SaveRoomType(RoomTypeDto roomType);
        Task<ResponseDto> SavePropertyField(NewPropertyFieldDto data);
        Task<ResponseDto> SaveWorkOrder(SaveWorkOrderDto data, List<IFormFile> images);
        Task<ResponseDto> GetWorkOrderImages(int id);
    }
}
