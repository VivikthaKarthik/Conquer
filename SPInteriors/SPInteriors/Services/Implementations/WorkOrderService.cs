using Microsoft.AspNetCore.Mvc;
using SPInteriors.Components.Pages;
using SPInteriors.Models;
using SPInteriors.Models.Domain;
using SPInteriors.Services.Interfaces;


namespace SPInteriors.Services.Implementations
{
    public class WorkOrderService : IWorkOrderService
    {
        private readonly SpinteriorsContext dbContext;
        //private readonly IMapper mapper;
        public WorkOrderService(SpinteriorsContext _dbContext)
        {
            dbContext = _dbContext;
            //mapper = _mapper;
        }

        public async Task<WorkOrderDto> GetWorkOrderByIdAsync(int id)
        {
            WorkOrderDto workorder = new WorkOrderDto();

            if (dbContext.VwWorkOrders.Any(x => x.Id == id))
            {
                var data = dbContext.VwWorkOrders.First(x => x.Id == id);
                workorder.Id = data.Id;
                workorder.Name = data.Name;
                workorder.WorkOrderItemId = data.WorkOrderItemId;
                workorder.WorkOrderType = data.WorkOrderType;
                workorder.OuterFrameType = data.OuterFrameType;
                workorder.RoomId = data.RoomId;
                workorder.Room = data.Room;
                workorder.DesignType = data.DesignType;
                workorder.MaterialType = data.MaterialType;
                workorder.Width = data.Width;
                workorder.Height = data.Height;
                workorder.SuppressCalculation = data.SuppressCalculation;
                workorder.Amount = data.Amount;

                if(dbContext.WorkOrderImages.Any(x=>x.WorkOrderId == id))
                {
                    workorder.ImagePath = dbContext.WorkOrderImages.First(x => x.WorkOrderId == id).ImagePath;
                }
            }
            return workorder;
        }

        public async Task<string> GetWorkOrderItemImage(int id)
        {
            string imagePath = string.Empty;
            if (dbContext.WorkOrderItems.Any(x => x.Id == id))
            {
                imagePath = dbContext.WorkOrderItems.First(x => x.Id == id).ImagePath;
            }
            return imagePath;
        }

        public async Task<List<WorkOrderDto>> GetWorkOrdersListAsync(int roomId)
        {
            List<WorkOrderDto> list = new List<WorkOrderDto>();

            if (dbContext.VwWorkOrders.Any(x => x.RoomId == roomId))
            {
                var listItems = dbContext.VwWorkOrders.Where(x => x.RoomId == roomId).ToList();

                foreach (var data in listItems)
                {
                    WorkOrderDto workorder = new WorkOrderDto();
                    workorder.Id = data.Id;
                    workorder.WorkOrderItemId = data.WorkOrderItemId;
                    workorder.WorkOrderItem = data.WorkOrderItem;
                    workorder.OuterFrameType = data.OuterFrameType;
                    workorder.WorkOrderType = data.WorkOrderType;
                    workorder.RoomId = data.RoomId;
                    workorder.DesignType = data.DesignType;
                    workorder.MaterialType = data.MaterialType;
                    workorder.Height = data.Height;
                    workorder.Width = data.Width;
                    workorder.SuppressCalculation = data.SuppressCalculation;
                    workorder.Amount = data.Amount;

                    if (dbContext.WorkOrderImages.Any(x => x.WorkOrderId == data.Id))
                    {
                        workorder.ImagePath = dbContext.WorkOrderImages.First(x => x.WorkOrderId == data.Id).ImagePath;
                    }

                    list.Add(workorder);
                }
            }
            return list;
        }


        public async Task<bool> CreateWorkOrderAsync(WorkOrderDto data)
        {
            try
            {
                Models.Domain.WorkOrder workorder = new Models.Domain.WorkOrder();

                if (data != null)
                {
                    workorder.Name = data.Name;
                    workorder.WorkOrderItemId = data.WorkOrderItemId;
                    workorder.WorkOrderType = data.WorkOrderType;
                    workorder.RoomId = data.RoomId;
                    workorder.DesignType = data.DesignType;
                    workorder.MaterialType = data.MaterialType;
                    workorder.OuterFrameType = data.OuterFrameType;
                    workorder.Width = data.Width;
                    workorder.Width = data.Width;
                    workorder.Height = data.Height;
                    workorder.Height = data.Height;
                    workorder.SuppressCalculation = data.SuppressCalculation;
                    workorder.Amount = data.Amount;

                    dbContext.WorkOrders.Add(workorder);
                    await dbContext.SaveChangesAsync();
                }
            }
            catch(Exception ex)
            {
                return false;
            }
            return true;
        }


        public async Task<bool> UpdateWorkOrderAsync(WorkOrderDto data)
        {
            if (data != null && data.Id > 0)
            {
                try
                {
                    var workorder = dbContext.WorkOrders.FirstOrDefault(s => s.Id == data.Id);

                    if (workorder != null)
                    {
                        workorder.Name = data.Name;
                        workorder.WorkOrderItemId = data.WorkOrderItemId;
                        workorder.WorkOrderType = data.WorkOrderType;
                        workorder.RoomId = data.RoomId;
                        workorder.DesignType = data.DesignType;
                        workorder.MaterialType = data.MaterialType;
                        workorder.OuterFrameType = data.OuterFrameType;
                        workorder.Width = data.Width;
                        workorder.Width = data.Width;
                        workorder.Height = data.Height;
                        workorder.Height = data.Height;
                        workorder.SuppressCalculation = data.SuppressCalculation;
                        workorder.Amount = data.Amount;

                        await dbContext.SaveChangesAsync();
                    }
                }
                catch (Exception ex)
                {

                }
            }
            return true;
        }
    }
}
