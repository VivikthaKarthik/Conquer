using SPInteriors.Models;

namespace SPInteriors.Services.Interfaces
{
    public interface IWorkOrderService
    {
        Task<WorkOrderDto> GetWorkOrderByIdAsync(int id);
        Task<bool> CreateWorkOrderAsync(WorkOrderDto data);
        Task<bool> UpdateWorkOrderAsync(WorkOrderDto data);
    }
}
