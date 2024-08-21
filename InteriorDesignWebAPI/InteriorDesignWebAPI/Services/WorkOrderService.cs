using AutoMapper;
using Azure;
using InteriorDesignWebAPI.Models.Domain;
using InteriorDesignWebAPI.Models.Dtos;
using InteriorDesignWebAPI.Services.Interfaces;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace InteriorDesignWebAPI.Services
{
    public class WorkOrderService : IWorkOrderService
    {
        private readonly InteriorDesignContext dbContext;
        private readonly IMapper mapper;

        public WorkOrderService(InteriorDesignContext _dbContext, IMapper _mapper)
        {
            dbContext = _dbContext;
            mapper = _mapper;
        }

        public async Task<ResponseDto> GetWorkOrderByIdAsync(int id)
        {
            ResponseDto response = new ResponseDto();
            try
            {
                var workOrder = await dbContext.VwWorkOrders.FirstOrDefaultAsync(x => x.Id == id);

                if (workOrder != null)
                {
                    response.Result = mapper.Map<WorkOrderDto>(workOrder);
                    //if (dbContext.WorkOrderImages.Any(x => x.WorkOrderId == id))
                    //{
                    //    workorder.ImagePath = dbContext.WorkOrderImages.First(x => x.WorkOrderId == id).ImagePath;
                    //}

                    //if (dbContext.WorkOrderParts.Any(x => x.WorkOrderId == id))
                    //{
                    //    workorder.Parts = new List<WorkOrderPartDto>();
                    //    var partsList = dbContext.WorkOrderParts.Where(x => x.WorkOrderId == id).ToList();

                    //    var workOrderTypes = dbContext.WorkOrderTypes.ToList();

                    //    foreach (var item in partsList)
                    //    {
                    //        WorkOrderPartDto part = new WorkOrderPartDto()
                    //        {
                    //            Id = item.Id,
                    //            WorkOrderId = item.WorkOrderId,
                    //            Notes = item.Notes,
                    //            WorkOrderTypeId = item.WorkOrderTypeId
                    //        };

                    //        height += item.Height;
                    //        width += item.Width;

                    //        if (workOrderTypes.Any(x => x.Id == item.WorkOrderTypeId))
                    //            part.WorkOrderType = workOrderTypes.First(x => x.Id == item.WorkOrderTypeId).Name;

                    //        workorder.Parts.Add(part);
                    //    }
                    //}

                    //if (height > 0)
                    //    workorder.Height = height;

                    //if (width > 0)
                    //    workorder.Width = width;
                }
                else
                    response.Message = "Not Found";

                response.IsSuccess = true;
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            return response;
        }
        public async Task<ResponseDto> GetWorkOrdersByRoomIdAsync(int roomId)
        {
            ResponseDto response = new ResponseDto();
            try
            {
                var workOrders = await dbContext.VwWorkOrders.Where(x => x.RoomId == roomId).ToListAsync();

                if (workOrders != null && workOrders.Count > 0)
                {
                    List<WorkOrderDto> list = new List<WorkOrderDto>();
                    foreach (var data in workOrders)
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
                    response.Result = list;
                    //if (dbContext.WorkOrderImages.Any(x => x.WorkOrderId == id))
                    //{
                    //    workorder.ImagePath = dbContext.WorkOrderImages.First(x => x.WorkOrderId == id).ImagePath;
                    //}

                    //if (dbContext.WorkOrderParts.Any(x => x.WorkOrderId == id))
                    //{
                    //    workorder.Parts = new List<WorkOrderPartDto>();
                    //    var partsList = dbContext.WorkOrderParts.Where(x => x.WorkOrderId == id).ToList();

                    //    var workOrderTypes = dbContext.WorkOrderTypes.ToList();

                    //    foreach (var item in partsList)
                    //    {
                    //        WorkOrderPartDto part = new WorkOrderPartDto()
                    //        {
                    //            Id = item.Id,
                    //            WorkOrderId = item.WorkOrderId,
                    //            Notes = item.Notes,
                    //            WorkOrderTypeId = item.WorkOrderTypeId
                    //        };

                    //        height += item.Height;
                    //        width += item.Width;

                    //        if (workOrderTypes.Any(x => x.Id == item.WorkOrderTypeId))
                    //            part.WorkOrderType = workOrderTypes.First(x => x.Id == item.WorkOrderTypeId).Name;

                    //        workorder.Parts.Add(part);
                    //    }
                    //}

                    //if (height > 0)
                    //    workorder.Height = height;

                    //if (width > 0)
                    //    workorder.Width = width;
                }
                else
                    response.Message = "Not Found";

                response.IsSuccess = true;
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<ResponseDto> GetWorkOrderItemImage(int id)
        {

            ResponseDto response = new ResponseDto();
            try
            {
                var workOrderItem = await dbContext.WorkOrderItems.FirstOrDefaultAsync(x => x.Id == id);

                if (workOrderItem != null)
                    response.Result = workOrderItem.ImagePath;
                else
                    response.Message = "Not Found";

                response.IsSuccess = true;
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<ResponseDto> CreateWorkOrderAsync(WorkOrderDto data)
        {
            ResponseDto response = new ResponseDto();
            try
            {
                if (data != null)
                {
                    WorkOrder workorder = mapper.Map<WorkOrder>(data);
                    dbContext.WorkOrders.Add(workorder);
                    await dbContext.SaveChangesAsync();
                    response.IsSuccess = true;
                    response.Message = data.Name + " Inserted Successfully";
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

        public async Task<ResponseDto> UpdateWorkOrderAsync(WorkOrderDto data)
        {
            ResponseDto response = new ResponseDto();
            try
            {
                if (data != null)
                {
                    var workOrder = dbContext.WorkOrders.First(x => x.Id == data.Id);

                    if (workOrder != null)
                    {
                        workOrder = mapper.Map<WorkOrder>(data);

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

        public async Task<ResponseDto> DeleteWorkOrder(int id)
        {
            ResponseDto response = new ResponseDto();
            try
            {
                if (dbContext.WorkOrders.Any(x => x.Id == id))
                {
                    var workOrder = dbContext.WorkOrders.First(x => x.Id == id);

                    if (dbContext.WorkOrderParts.Any(x => x.WorkOrderId == id))
                    {
                        var parts = dbContext.WorkOrderParts.Where(x => x.WorkOrderId == id);

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

                    await dbContext.SaveChangesAsync();
                    response.IsSuccess = true;
                    response.Message = workOrder.Name + " Deleted Successfully";
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
