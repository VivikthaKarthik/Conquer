using InteriorDesignWebAPI.Models.Dtos;
using Microsoft.AspNetCore.Components.Forms;

namespace InteriorDesignWebAPI.Services.Interfaces
{
    public interface IWorkOrderService
    {
        Task<ResponseDto> GetWorkOrderByIdAsync(int id);
        Task<ResponseDto> GetWorkOrderItemImage(int id);
        Task<ResponseDto> CreateWorkOrderAsync(WorkOrderDto data);
        Task<ResponseDto> UpdateWorkOrderAsync(WorkOrderDto data);
        //Task<List<ListItemDto>> GetWorkOrderImagesAsync(int workOrderId);
        //Task<List<WorkOrderPropertyDto>> GetWorkOrderPropertiesAsync();
        //Task<WorkOrderDto> GetWorkOrderAsync(int id);
        //Task<WorkOrderPartDto> GetWorkOrderPartsAsync(int id);
        //Task<bool> CreateWorkOrderPartAsync(WorkOrderPartDto data, List<WorkOrderPropertyDto> properties);
        //Task<bool> UpdateWorkOrderPartAsync(WorkOrderPartDto data, List<WorkOrderPropertyDto> properties);
        //Task<bool> DeleteWorkOrderPart(int id);
        Task<ResponseDto> DeleteWorkOrder(int id);
        //Task<bool> CreateWorkOrderItemAsync(IBrowserFile image, int roomId, CreateWorkOrderItemDto data);
    }
}
