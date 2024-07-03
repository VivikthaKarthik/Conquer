using Microsoft.AspNetCore.Components.Forms;
using SPInteriors.Models;

namespace SPInteriors.Services.Interfaces
{
    public interface IWorkOrderService
    {
        Task<WorkOrderDto> GetWorkOrderByIdAsync(int id);
        Task<string> GetWorkOrderItemImage(int id);
        Task<bool> CreateWorkOrderAsync(WorkOrderDto data);
        Task<bool> UpdateWorkOrderAsync(WorkOrderDto data);
        Task<List<ListItemDto>> GetWorkOrderImagesAsync(int workOrderId);
        Task<List<WorkOrderPropertyDto>> GetWorkOrderPropertiesAsync();
        Task<WorkOrderDto> GetWorkOrderAsync(int id);
        Task<WorkOrderPartDto> GetWorkOrderPartsAsync(int id);
        Task<bool> CreateWorkOrderPartAsync(WorkOrderPartDto data, List<WorkOrderPropertyDto> properties);
        Task<bool> UpdateWorkOrderPartAsync(WorkOrderPartDto data, List<WorkOrderPropertyDto> properties);
        Task<bool> DeleteWorkOrderPart(int id);
        Task<bool> DeleteWorkOrder(int id);
        Task<bool> CreateWorkOrderItemAsync(IBrowserFile image, int roomId, CreateWorkOrderItemDto data);
    }
}
