using SPInteriors.Models;

namespace SPInteriors.Services.Interfaces
{
    public interface IWorkOrderService
    {
        Task<WorkOrderDto> GetWorkOrderByIdAsync(int id);
        Task<string> GetWorkOrderItemImage(int id);
        Task<bool> CreateWorkOrderAsync(WorkOrderDto data, List<WorkOrderPropertyDto> properties);
        Task<bool> UpdateWorkOrderAsync(WorkOrderDto data, List<WorkOrderPropertyDto> properties);

        Task<List<WorkOrderPropertyDto>> GetWorkOrderPropertiesAsync();
    }
}
