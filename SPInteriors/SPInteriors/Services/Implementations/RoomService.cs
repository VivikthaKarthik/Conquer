using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using SPInteriors.Components.Pages;
using SPInteriors.Models;
using SPInteriors.Models.Domain;
using SPInteriors.Services.Interfaces;
using System.IO;
using static iTextSharp.text.pdf.AcroFields;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace SPInteriors.Services.Implementations
{
    public class RoomService: IRoomService
    {
        private readonly InteriorDesignContext dbContext;
        //private readonly IMapper mapper;
        public RoomService(InteriorDesignContext _dbContext)
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
                room.RoomTypeId = item.RoomTypeId;
                room.ProjectId = item.ProjectId;
                room.ProjectName = item.ProjectName;
                room.MaterialTypeId = item.MaterialTypeId;
                room.Material = item.MaterialType;
                room.OuterFrameTypeId = item.OuterFrameTypeId;
                room.OuterFrame = item.OuterFrameType;

                if (dbContext.VwWorkOrders.Any(x => x.RoomId == item.Id))
                {
                    room.WorkOrders = new List<WorkOrderDto>();
                    var services = dbContext.VwWorkOrders.Where(x => x.RoomId == item.Id).ToList();

                    foreach (var data in services)
                    {
                        WorkOrderDto workorder = new WorkOrderDto();
                        workorder.Id = data.Id;
                        workorder.Name = data.Name;
                        workorder.RoomTypeId = room.RoomTypeId;
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

                        if (dbContext.WorkOrderImages.Any(x => x.WorkOrderId == data.Id))
                        {
                            workorder.ImagePath = dbContext.WorkOrderImages.First(x => x.WorkOrderId == data.Id).ImagePath;
                        }

                        room.WorkOrders.Add(workorder);
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
                    room.RoomTypeId = item.RoomTypeId;
                    room.ProjectId = item.ProjectId;
                    room.ProjectName = item.ProjectName;
                    room.MaterialTypeId = item.MaterialTypeId;
                    room.Material = item.MaterialType;
                    room.OuterFrameTypeId = item.OuterFrameTypeId;
                    room.OuterFrame = item.OuterFrameType;

                    if (dbContext.VwWorkOrders.Any(x => x.RoomId == item.Id))
                    {
                        room.WorkOrders = new List<WorkOrderDto>();
                        var services = dbContext.VwWorkOrders.Where(x => x.RoomId == item.Id).ToList();

                        foreach (var data in services)
                        {
                            decimal height = 0;
                            decimal width = 0;

                            WorkOrderDto workorder = new WorkOrderDto();
                            workorder.Id = data.Id;
                            workorder.Name = data.Name;
                            workorder.RoomTypeId = room.RoomTypeId;
                            workorder.WorkOrderItemId = data.WorkOrderItemId;
                            workorder.WorkOrderItem = data.WorkOrderItem;
                            workorder.WorkOrderType = data.WorkOrderType;
                            workorder.RoomId = data.RoomId;
                            workorder.Height = data.Height;
                            workorder.Width = data.Width;
                            workorder.DesignType = data.DesignType;
                            workorder.MaterialType = data.MaterialType;
                            workorder.OuterFrameType = data.OuterFrameType;
                            workorder.SuppressCalculation = data.SuppressCalculation;
                            workorder.Amount = data.Amount;

                            if (dbContext.WorkOrderImages.Any(x => x.WorkOrderId == data.Id))
                            {
                                workorder.ImagePath = dbContext.WorkOrderImages.First(x => x.WorkOrderId == data.Id).ImagePath;
                            }

                            if (dbContext.WorkOrderParts.Any(x => x.WorkOrderId == data.Id))
                            {
                                workorder.Parts = new List<WorkOrderPartDto>();
                                var partsList = dbContext.WorkOrderParts.Where(x => x.WorkOrderId == data.Id).ToList();

                                var workOrderTypes = dbContext.WorkOrderTypes.ToList();

                                foreach (var partItem in partsList)
                                {
                                    WorkOrderPartDto part = new WorkOrderPartDto()
                                    {
                                        Id = partItem.Id,
                                        WorkOrderId = partItem.WorkOrderId,
                                        Height = partItem.Height,
                                        Width = partItem.Width,
                                        Notes = partItem.Notes,
                                        WorkOrderTypeId = partItem.WorkOrderTypeId
                                    };

                                    height += partItem.Height;
                                    width += partItem.Width;

                                    if (workOrderTypes.Any(x => x.Id == partItem.WorkOrderTypeId))
                                        part.WorkOrderType = workOrderTypes.First(x => x.Id == partItem.WorkOrderTypeId).Name;

                                    if (dbContext.WorkOrderDetails.Any(x => x.WorkOrderId == part.Id))
                                    {
                                        part.Details = new List<WorkOrderDetailsDto>();
                                        var deatilsList = dbContext.WorkOrderDetails.Where(x => x.WorkOrderId == part.Id).ToList();

                                        foreach (var deatil in deatilsList)
                                        {
                                            WorkOrderDetailsDto workOrderDetails = new WorkOrderDetailsDto()
                                            {
                                                Id = deatil.Id,
                                                Name = deatil.Name,
                                                Value = deatil.Value,
                                            };

                                            part.Details.Add(workOrderDetails);
                                        }
                                    }
                                    workorder.Parts.Add(part);
                                }
                            }

                            if (height > 0)
                                workorder.Height = height;

                            if (width > 0)
                                workorder.Width = width;

                            room.WorkOrders.Add(workorder);
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
                        room.RoomTypeId = data.RoomTypeId;
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
                        room.RoomTypeId = data.RoomTypeId;
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


        public async Task<bool> DeleteRoom(int id)
        {
            bool isDeleted = false;

            if (dbContext.Rooms.Any(x => x.Id == id))
            {
                var room = dbContext.Rooms.First(x => x.Id == id);

                if (dbContext.WorkOrders.Any(x => x.RoomId == room.Id))
                {

                    var workOrders = dbContext.WorkOrders.Where(x => x.RoomId == room.Id).ToList();

                    foreach (var workOrder in workOrders)
                    {
                        if (dbContext.WorkOrderParts.Any(x => x.WorkOrderId == workOrder.Id))
                        {
                            var parts = dbContext.WorkOrderParts.Where(x => x.WorkOrderId == workOrder.Id);

                            foreach (var part in parts)
                            {
                                if (dbContext.WorkOrderParts.Any(x => x.Id == part.Id))
                                {
                                    if (dbContext.WorkOrderDetails.Any(x => x.WorkOrderId == part.Id))
                                    {
                                        var details = dbContext.WorkOrderDetails.Where(x => x.WorkOrderId == part.Id);
                                        dbContext.WorkOrderDetails.RemoveRange(details);
                                    }
                                    dbContext.WorkOrderParts.Remove(part);
                                }
                            }
                        }
                        dbContext.WorkOrders.Remove(workOrder);
                    }
                }

                dbContext.Rooms.Remove(room);
                await dbContext.SaveChangesAsync();
                isDeleted = true;
            }
            return isDeleted;
        }
    }
}
