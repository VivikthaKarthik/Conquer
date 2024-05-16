using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using SPInteriors.Components.Pages;
using SPInteriors.Models;
using SPInteriors.Models.Domain;
using SPInteriors.Services.Interfaces;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace SPInteriors.Services.Implementations
{
    public class RoomService: IRoomService
    {
        private readonly SpinteriorsContext dbContext;
        //private readonly IMapper mapper;
        public RoomService(SpinteriorsContext _dbContext)
        {
            dbContext = _dbContext;
            //mapper = _mapper;
        }

        public async Task<RoomDto> GetRoomListByIdAsync(int id)
        {
            RoomDto room = new RoomDto();

            if (dbContext.VwRooms.Any(x => x.Id == id))
            {
                var item = dbContext.VwRooms.First(x => x.Id == id);
                room.Id = item.Id;
                room.Name = item.Name;
                room.ProjectId = item.ProjectId;
                room.ProjectName = item.ProjectName;
                room.MaterialTypeId = item.MaterialTypeId;
                room.Material = item.MaterialType;
                room.OuterFrameTypeId = item.OuterFrameTypeId;
                room.OuterFrame = item.OuterFrameType;

                if (dbContext.VwWorkOrders.Any(x => x.RoomId == item.Id))
                {
                    room.Services = new List<WorkOrderDto>();
                    var services = dbContext.VwWorkOrders.Where(x => x.RoomId == item.Id).ToList();

                    foreach (var data in services)
                    {
                        WorkOrderDto workorder = new WorkOrderDto();
                        workorder.Id = data.Id;
                        workorder.Name = data.Name;
                        workorder.WorkOrderItemId = data.WorkOrderItemId;
                        workorder.WorkOrderItem = data.WorkOrderItem;
                        workorder.WorkOrderType = data.WorkOrderType;
                        workorder.RoomId = data.RoomId;
                        workorder.DesignType = data.DesignType;
                        workorder.MaterialType = data.MaterialType;
                        workorder.OuterFrameType = data.OuterFrameType;
                        workorder.Width = data.Width;
                        workorder.Height = data.Height;
                        workorder.SuppressCalculation = data.SuppressCalculation;
                        workorder.Amount = data.Amount;

                        room.Services.Add(workorder);
                    }
                }
            }
            return room;
        }

        public async Task<List<RoomDto>> GetRoomListAsync(int projectId)
        {
            List<RoomDto> list = new List<RoomDto>();

            if (dbContext.VwRooms.Any(x => x.ProjectId == projectId))
            {
                var listItems = dbContext.VwRooms.Where(x => x.ProjectId == projectId).ToList();

                foreach (var item in listItems)
                {
                    RoomDto room = new RoomDto();
                    room.Id = item.Id;
                    room.Name = item.Name;
                    room.ProjectId = item.ProjectId;
                    room.ProjectName = item.ProjectName;
                    room.MaterialTypeId = item.MaterialTypeId;
                    room.Material = item.MaterialType;
                    room.OuterFrameTypeId = item.OuterFrameTypeId;
                    room.OuterFrame = item.OuterFrameType;

                    if (dbContext.VwWorkOrders.Any(x => x.RoomId == item.Id))
                    {
                        room.Services = new List<WorkOrderDto>();
                        var services = dbContext.VwWorkOrders.Where(x => x.RoomId == item.Id).ToList();

                        foreach (var data in services)
                        {
                            WorkOrderDto workorder = new WorkOrderDto();
                            workorder.Id = data.Id;
                            workorder.Name = data.Name;
                            workorder.WorkOrderItemId = data.WorkOrderItemId;
                            workorder.WorkOrderItem = data.WorkOrderItem;
                            workorder.WorkOrderType = data.WorkOrderType;
                            workorder.RoomId = data.RoomId;
                            workorder.DesignType = data.DesignType;
                            workorder.MaterialType = data.MaterialType;
                            workorder.OuterFrameType = data.OuterFrameType;
                            workorder.Width = data.Width;
                            workorder.Height = data.Height;
                            workorder.SuppressCalculation = data.SuppressCalculation;
                            workorder.Amount = data.Amount;

                            room.Services.Add(workorder);
                        }
                    }

                    list.Add(room);
                }
            }
            return list;
        }



        public async Task<bool> CreateRoomAsync(RoomDto data)
        {
            try
            {
                if (!dbContext.Rooms.Any(x => x.Id == data.Id))
                {
                    Models.Domain.Room room = new Models.Domain.Room();

                    if (data != null)
                    {
                        room.Name = data.Name;
                        room.ProjectId = data.ProjectId;
                        //room.StatusId = data.StatusId;
                        room.MaterialTypeId = data.MaterialTypeId;
                        room.OuterFrameTypeId = data.OuterFrameTypeId;

                        dbContext.Rooms.Add(room);
                        await dbContext.SaveChangesAsync();
                    }
                }
                else
                {
                    await UpdateRoomAsync(data);
                }
            }
            catch (Exception ex)
            {

            }
            return true;
        }


        public async Task<bool> UpdateRoomAsync(RoomDto data)
        {
            try
            {
                if (dbContext.Rooms.Any(x => x.Id == data.Id))
                {
                    Models.Domain.Room room = dbContext.Rooms.First(x => x.Id == data.Id);

                    if (data != null)
                    {
                        room.Name = data.Name;
                        room.ProjectId = data.ProjectId;
                        //room.StatusId = data.StatusId;
                        room.MaterialTypeId = data.MaterialTypeId;
                        room.OuterFrameTypeId = data.OuterFrameTypeId;
                        await dbContext.SaveChangesAsync();
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return true;
        }
    }
}
