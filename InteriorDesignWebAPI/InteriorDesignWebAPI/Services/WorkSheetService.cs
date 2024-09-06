using AutoMapper;
using Azure;
using InteriorDesignWebAPI.Models.Domain;
using InteriorDesignWebAPI.Models.Dtos;
using InteriorDesignWebAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace InteriorDesignWebAPI.Services
{
    public class WorkSheetService : IWorkSheetService
    {
        private readonly InteriorDesignContext dbContext;
        private readonly IMapper mapper;

        public WorkSheetService(InteriorDesignContext _dbContext, IMapper _mapper)
        {
            dbContext = _dbContext;
            mapper = _mapper;
        }


        public async Task<ResponseDto> GetWorkSheetByIdAsync(int projectId)
        {
            ResponseDto response = new ResponseDto();
            List<WorkSheetDto> list = new List<WorkSheetDto>();

            if (dbContext.VwRooms.Any(x => x.ProjectId == projectId))
            {
                var listItems = dbContext.VwRooms.Where(x => x.ProjectId == projectId).ToList();

                foreach (var item in listItems)
                {
                    WorkSheetDto room = new WorkSheetDto();
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
            response.Result = list;
            response.IsSuccess = true;


            return response;
        }

        public async Task<ResponseDto> GetImageData(string imagePath)
        {
            ResponseDto response = new ResponseDto();
            try
            {
                var appPath = "C:\\GIT\\Cordova\\spinteriors\\www";
                imagePath = Path.Combine(appPath, imagePath);
                byte[] imageBytes = File.ReadAllBytes(imagePath);
                string base64String = Convert.ToBase64String(imageBytes);
                response.Result = "data:image/png;base64," + base64String; ;
                response.IsSuccess = true;
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
            }
            return response;
        }

    }
}
