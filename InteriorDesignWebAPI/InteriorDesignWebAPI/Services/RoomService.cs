using AutoMapper;
using InteriorDesignWebAPI.Models.Domain;
using InteriorDesignWebAPI.Models.Dtos;
using InteriorDesignWebAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace InteriorDesignWebAPI.Services
{
    public class RoomService : IRoomService
    {
        private readonly InteriorDesignContext dbContext;
        private readonly IMapper mapper;

        public RoomService(InteriorDesignContext _dbContext, IMapper _mapper)
        {
            dbContext = _dbContext;
            mapper = _mapper;
        }

        public async Task<ResponseDto> GetRoomById(int id)
        {
            ResponseDto response = new ResponseDto();
            try
            {
                var room = await dbContext.Rooms.FirstOrDefaultAsync(x => x.Id == id);

                if (room != null)
                {
                    var item = mapper.Map<RoomDto>(room);
                    if (item.RoomTypeId > 0)
                        item.ImagePath = dbContext.RoomTypes.First(x => x.Id == item.RoomTypeId).ImagePath;
                    response.Result = item;
                    response.IsSuccess = true;
                }
                else
                {
                    response.IsSuccess = false;
                    response.Message = "Not Found";
                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            return response;
        }
        public async Task<ResponseDto> GetRoomsByProjectId(int projectId)
        {
            ResponseDto response = new ResponseDto();
            try
            {
                var rooms = await dbContext.Rooms.Where(x => x.ProjectId == projectId).ToListAsync();
                var roomTypes = await dbContext.RoomTypes.ToListAsync();

                if (rooms != null && rooms.Count > 0)
                {
                    List<RoomDto> list = mapper.Map<List<RoomDto>>(rooms);
                    foreach (var item in list)
                    {
                        if (item.RoomTypeId > 0)
                            item.ImagePath = roomTypes.First(x => x.Id == item.RoomTypeId).ImagePath;
                    }
                    response.Result = list;
                    response.IsSuccess = true;
                }
                else
                {
                    response.IsSuccess = false;
                    response.Message = "Not Found";
                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            return response;
        }
        public async Task<ResponseDto> CreateRoomAsync(RoomDto data)
        {
            ResponseDto response = new ResponseDto();
            try
            {
                if (data != null)
                {
                    Room room = mapper.Map<Room>(data);
                    dbContext.Rooms.Add(room);
                    await dbContext.SaveChangesAsync();
                    response.IsSuccess = true;
                    response.Message = data.Name + " Added Successfuly";
                }
                else
                {
                    response.IsSuccess = false;
                    response.Message = "Invalid Request";
                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = true;
                response.Message = ex.Message;
            }
            return response;
        }
        public async Task<ResponseDto> UpdateRoomAsync(RoomDto data)
        {
            ResponseDto response = new ResponseDto();
            try
            {
                if (data != null)
                {
                    var room = dbContext.Rooms.First(x => x.Id == data.Id);

                    if (room != null)
                    {
                        room = mapper.Map<Room>(data);

                        await dbContext.SaveChangesAsync();
                        response.IsSuccess = true;
                        response.Message = data.Name + " Updated Successfully";
                    }
                    else
                    {
                        response.IsSuccess = false;
                        response.Message = data.Name + " Not Found";
                    }
                }
                else
                {
                    response.IsSuccess = true;
                    response.Message = "Invalid Request";
                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = true;
                response.Message = ex.Message;
            }
            return response;
        }
        public async Task<ResponseDto> DeleteRoom(int id)
        {
            ResponseDto response = new ResponseDto();
            try
            {
                if (id > 0 && dbContext.Rooms.Any(x => x.Id == id))
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
                            response.IsSuccess = true;
                            response.Message = room.Name + " Deleted Successfully";
                        }
                    }
                    else
                    {
                        response.IsSuccess = false;
                        response.Message = "Not Found";
                    }
                    dbContext.Rooms.Remove(room);
                    await dbContext.SaveChangesAsync();
                }
                else
                {
                    response.IsSuccess = true;
                    response.Message = "Invalid Request";
                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = true;
                response.Message = ex.Message;
            }
            return response;
        }
    }
}
