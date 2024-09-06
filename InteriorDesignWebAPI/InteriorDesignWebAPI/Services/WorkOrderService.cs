using AutoMapper;
using Azure;
using InteriorDesignWebAPI.Models.Domain;
using InteriorDesignWebAPI.Models.Dtos;
using InteriorDesignWebAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using static System.Net.Mime.MediaTypeNames;

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
                decimal height = 0;
                decimal width = 0;
                var workOrder = await dbContext.VwWorkOrders.FirstOrDefaultAsync(x => x.Id == id);

                if (workOrder != null)
                {
                    WorkOrderDto workorder = mapper.Map<WorkOrderDto>(workOrder);
                    if (dbContext.WorkOrderImages.Any(x => x.WorkOrderId == id))
                    {
                        workorder.ImagePath = dbContext.WorkOrderImages.First(x => x.WorkOrderId == id).ImagePath;
                    }

                    if (dbContext.WorkOrderParts.Any(x => x.WorkOrderId == id))
                    {
                        workorder.Parts = new List<WorkOrderPartDto>();
                        var partsList = dbContext.WorkOrderParts.Where(x => x.WorkOrderId == id).ToList();

                        var workOrderTypes = dbContext.WorkOrderTypes.ToList();

                        foreach (var item in partsList)
                        {
                            WorkOrderPartDto part = new WorkOrderPartDto()
                            {
                                Id = item.Id,
                                WorkOrderId = item.WorkOrderId,
                                Notes = item.Notes,
                                WorkOrderTypeId = item.WorkOrderTypeId
                            };

                            height += item.Height;
                            width += item.Width;

                            if (workOrderTypes.Any(x => x.Id == item.WorkOrderTypeId))
                                part.WorkOrderType = workOrderTypes.First(x => x.Id == item.WorkOrderTypeId).Name;

                            workorder.Parts.Add(part);
                        }
                    }

                    if (height > 0)
                        workorder.Height = height;

                    if (width > 0)
                        workorder.Width = width;
                    response.Result = workorder;
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

        public async Task<ResponseDto> GetWorkOrderImages(int id)
        {

            ResponseDto response = new ResponseDto();
            try
            {
                var workOrderImages = dbContext.WorkOrderImages.Where(x => x.WorkOrderId == id).ToList();

                if (workOrderImages != null && workOrderImages.Count > 0)
                    response.Result = mapper.Map<List<WorkOrderImageDto>>(workOrderImages);
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

                    if (dbContext.WorkOrderImages.Any(x => x.WorkOrderId == id))
                    {
                        var images = dbContext.WorkOrderImages.Where(x => x.WorkOrderId == id);

                        foreach (var image in images)
                        {
                            dbContext.WorkOrderImages.Remove(image);
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

        public async Task<ResponseDto> DeleteWorkOrderPart(int id)
        {
            ResponseDto response = new ResponseDto();
            try
            {
                if (dbContext.WorkOrderParts.Any(x => x.Id == id))
                {
                    var part = dbContext.WorkOrderParts.First(x => x.Id == id);

                    if (dbContext.WorkOrderDetails.Any(x => x.WorkOrderId == id))
                    {
                        var details = dbContext.WorkOrderDetails.Where(x => x.WorkOrderId == id);
                        dbContext.WorkOrderDetails.RemoveRange(details);
                    }
                    dbContext.WorkOrderParts.Remove(part);

                    await dbContext.SaveChangesAsync();
                    response.IsSuccess = true;
                    response.Message = " Deleted Successfully";
                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = true;
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<ResponseDto> GetWorkOrderPartByIdAsync(int id)
        {
            ResponseDto response = new ResponseDto();
            WorkOrderPartDto part = new WorkOrderPartDto();

            if (dbContext.WorkOrderParts.Any(x => x.Id == id))
            {
                var data = dbContext.WorkOrderParts.First(x => x.Id == id);
                part.Id = data.Id;
                part.WorkOrderId = data.WorkOrderId;
                part.WorkOrderTypeId = data.WorkOrderTypeId;
                part.Width = data.Width;
                part.Height = data.Height;
                part.Notes = data.Notes;

                if (dbContext.WorkOrderDetails.Any(x => x.WorkOrderId == id))
                {
                    part.Details = new List<WorkOrderDetailsDto>();
                    var deatilsList = dbContext.WorkOrderDetails.Where(x => x.WorkOrderId == id).ToList();

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

                part.Name = dbContext.WorkOrders.FirstOrDefault(x => x.Id == part.WorkOrderId).Name;
                if (part.WorkOrderTypeId > 0)
                {                    
                    var workOrderType = dbContext.WorkOrderTypes.First(x => x.Id == part.WorkOrderTypeId).Name;

                    if(workOrderType != null)
                    {
                        part.Name += " - " + workOrderType;
                    }
                }

            }
            response.Result = part;
            response.IsSuccess = true;
            return response;
        }

        public async Task<ResponseDto> GetWorkOrderPropertiesAsync()
        {
            ResponseDto response = new ResponseDto();
            List<WorkOrderPropertyDto> properties = new List<WorkOrderPropertyDto>();
            var listItems = dbContext.WorkOrderProperties.ToList();

            foreach (var data in listItems)
            {
                WorkOrderPropertyDto property = new WorkOrderPropertyDto();
                property.Id = data.Id;
                property.Name = data.Name;
                property.AllowMultipleSelect = data.AllowMultipleSelect;

                if (dbContext.WorkOrderPropertyFields.Any(x => x.WorkOrderPropertyId == data.Id))
                {
                    property.Fields = new List<WorkOrderPropertyFieldDto>();
                    var fields = dbContext.WorkOrderPropertyFields.Where(x => x.WorkOrderPropertyId == data.Id);
                    foreach (var field in fields)
                    {
                        WorkOrderPropertyFieldDto item = new WorkOrderPropertyFieldDto();
                        item.Id = field.Id;
                        item.Name = field.Name;

                        property.Fields.Add(item);
                    }
                }

                properties.Add(property);
            }
            response.Result = properties;
            response.IsSuccess = true;
            return response;
        }

        public async Task<ResponseDto> GetWorkOrderItemTypesAsync()
        {
            ResponseDto response = new ResponseDto();
            List<WorkOrderTypeDto> types = new List<WorkOrderTypeDto>();
            var listItems = dbContext.WorkOrderTypes.ToList();

            foreach (var data in listItems)
            {
                WorkOrderTypeDto type = new WorkOrderTypeDto();
                type.Id = data.Id;
                type.Name = data.Name;

                types.Add(type);
            }
            response.Result = types;
            response.IsSuccess = true;
            return response;
        }

        public async Task<ResponseDto> SaveWorkOrderPart(UpdateWorkOrderPartDto part)
        {
            ResponseDto response = new ResponseDto();

            try
            {
                if (part.WorkOrderPartId != null && part.WorkOrderPartId.Value > 0)
                {
                    var existingPart = dbContext.WorkOrderParts.FirstOrDefault(x => x.Id == part.WorkOrderPartId.Value);
                    existingPart.WorkOrderTypeId = !string.IsNullOrEmpty(part.WorkOrderTypeId) ? Convert.ToInt32(part.WorkOrderTypeId) : 0;
                    existingPart.Height = !string.IsNullOrEmpty(part.Height) ? Convert.ToDecimal(part.Height) : 0;
                    existingPart.Width = !string.IsNullOrEmpty(part.Width) ? Convert.ToDecimal(part.Width) : 0;
                    existingPart.Notes = part.Notes;

                    await dbContext.SaveChangesAsync();
                }
                else
                {
                    WorkOrderPart newPart = new WorkOrderPart();
                    newPart.WorkOrderId = part.WorkOrderId;
                    newPart.WorkOrderTypeId = !string.IsNullOrEmpty(part.WorkOrderTypeId) ? Convert.ToInt32(part.WorkOrderTypeId) : 0;
                    newPart.Height = !string.IsNullOrEmpty(part.Height) ? Convert.ToDecimal(part.Height) : 0;
                    newPart.Width = !string.IsNullOrEmpty(part.Width) ? Convert.ToDecimal(part.Width) : 0;
                    newPart.Notes = part.Notes;

                    dbContext.WorkOrderParts.Add(newPart);
                    await dbContext.SaveChangesAsync();

                    part.WorkOrderPartId = newPart.Id;
                }

                if (dbContext.WorkOrderDetails.Any(x => x.WorkOrderId == part.WorkOrderPartId))
                {
                    var existingDetails = dbContext.WorkOrderDetails.Where(x => x.WorkOrderId == part.WorkOrderPartId).ToList();
                    dbContext.WorkOrderDetails.RemoveRange(existingDetails);

                    await dbContext.SaveChangesAsync();
                }

                if (part.Properties != null && part.Properties.Count > 0)
                {
                    foreach(var property in part.Properties)
                    {
                        WorkOrderDetail detail = new WorkOrderDetail();
                        detail.WorkOrderId = part.WorkOrderPartId.Value;
                        detail.Name = property.PropertyName;
                        detail.Value = property.PropertyFieldName;

                        dbContext.WorkOrderDetails.Add(detail);
                    }

                    await dbContext.SaveChangesAsync();
                }

                response.Result = "Part Saved Successfully.";
                response.IsSuccess = true;
            }
            catch(Exception ex)
            {
                response.IsSuccess = false;

            }
            return response;
        }

        public async Task<string> SaveImage(IFormFile image, string folderPath)
        {
            string imagePath = "";
            try
            {
                var appPath = "C:\\GIT\\Cordova\\spinteriors\\www";
                if (image != null)
                {
                    if (!Directory.Exists(Path.Combine(appPath, folderPath)))
                    {
                        Directory.CreateDirectory(Path.Combine(appPath, folderPath));
                    }
                    imagePath = folderPath + image.FileName;
                    var filePath = Path.Combine(appPath, imagePath);

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await image.CopyToAsync(fileStream);
                    }
                }
            }
            catch (Exception ex)
            {
            }
            return imagePath;
        }

        public async Task<ResponseDto> SavePropertyField(NewPropertyFieldDto data)
        {
            ResponseDto response = new ResponseDto();
            try
            {
                if (data != null)
                {
                    WorkOrderPropertyField workOrderPropertyField = new WorkOrderPropertyField();
                    workOrderPropertyField.Name = data.Name;
                    workOrderPropertyField.WorkOrderPropertyId = data.PropertyId;
                    dbContext.WorkOrderPropertyFields.Add(workOrderPropertyField);

                    await dbContext.SaveChangesAsync();

                    response.IsSuccess = true;
                    response.Message = "New Property Inserted Successfully";
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

        public async Task<ResponseDto> SaveWorkOrderItem(WorkOrderItemDto data)
        {
            ResponseDto response = new ResponseDto();
            try
            {
                if (data != null)
                {
                    var workOrderItem = mapper.Map<WorkOrderItem>(data);
                    workOrderItem.ImagePath = await SaveImage(data.Image, "ImageVault\\WorkOrderItems\\");
                    dbContext.WorkOrderItems.Add(workOrderItem);

                    await dbContext.SaveChangesAsync();


                    if (data.WorkOrderId > 0)
                    {
                        var workOrder = dbContext.WorkOrders.FirstOrDefault(x => x.Id == data.WorkOrderId);
                        if (workOrder != null)
                        {
                            workOrder.WorkOrderItemId = workOrderItem.Id;
                            await dbContext.SaveChangesAsync();
                        }
                    }

                    response.IsSuccess = true;
                    response.Message = "WorkOrderItem Inserted Successfully";
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

        public async Task<ResponseDto> SaveRoomType(RoomTypeDto data)
        {
            ResponseDto response = new ResponseDto();
            try
            {
                if (data != null)
                {
                    var roomType = mapper.Map<RoomType>(data);
                    roomType.ImagePath = await SaveImage(data.Image, "ImageVault\\RoomTypes\\");
                    dbContext.RoomTypes.Add(roomType);
                    await dbContext.SaveChangesAsync();
                    response.IsSuccess = true;
                    response.Message = "WorkOrderItem Inserted Successfully";
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

        public async Task<ResponseDto> SaveWorkOrder(SaveWorkOrderDto data, List<IFormFile> images)
        {
            ResponseDto response = new ResponseDto();
            try
            {
                WorkOrder workOrder = null;
                if (data != null)
                {
                    if (data.Id != null && data.Id > 0)
                    {
                        workOrder = dbContext.WorkOrders.First(x => x.Id == data.Id);
                        workOrder.Name = data.Name;
                        workOrder.WorkOrderItemId = data.WorkOrderItemId;
                        workOrder.RoomId = data.RoomId;
                        workOrder.Width = data.Width;
                        workOrder.Height = data.Height;
                        workOrder.SuppressCalculation = data.SuppressCalculation;
                        workOrder.Amount = data.Amount;
                    }
                    else
                    {
                        if (dbContext.WorkOrders.Any(x => x.Name == data.Name && x.WorkOrderItemId == data.WorkOrderItemId))
                        {
                            workOrder = dbContext.WorkOrders.First(x => x.Id == data.Id);
                            workOrder.Name = data.Name;
                            workOrder.WorkOrderItemId = data.WorkOrderItemId;
                            workOrder.RoomId = data.RoomId;
                            workOrder.Width = data.Width;
                            workOrder.Height = data.Height;
                            workOrder.SuppressCalculation = data.SuppressCalculation;
                            workOrder.Amount = data.Amount;
                        }
                        else
                        {
                            workOrder = mapper.Map<WorkOrder>(data);
                            dbContext.WorkOrders.Add(workOrder);
                        }
                    }
                    await dbContext.SaveChangesAsync();

                    if(images != null && images.Count > 0)
                    {
                        var imagePaths = await SaveMultipleImages(images, workOrder.Id);

                        foreach(var image in imagePaths)
                        {
                            dbContext.WorkOrderImages.Add(image);
                        }
                        await dbContext.SaveChangesAsync();
                    }

                    response.Result = workOrder.Id;
                    response.IsSuccess = true;
                    response.Message = "WorkOrder Saved Successfully";
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

        public async Task<List<WorkOrderImage>> SaveMultipleImages(List<IFormFile> images, int workOrderId)
        {
            var imagePaths = new List<WorkOrderImage>();

            try
            {

                if (images != null)
                {
                    var appPath = "C:\\GIT\\Cordova\\spinteriors\\www";
                    var uploadsFolderPath = "ImageVault\\WorkOrders\\" + workOrderId + "\\";
                    var uploadPath = Path.Combine(appPath, uploadsFolderPath);
                    if (!Directory.Exists(uploadPath))
                    {
                        Directory.CreateDirectory(uploadPath);
                    }
                    foreach (var image in images)
                    {
                        if (image.Length > 0)
                        {
                            var fileName = Path.GetFileName(image.FileName);
                            var filePath = Path.Combine(uploadPath, fileName);
                            using (var stream = new FileStream(filePath, FileMode.Create))
                            {
                                await image.CopyToAsync(stream);
                            }
                            WorkOrderImage woImage = new WorkOrderImage();
                            woImage.WorkOrderId = workOrderId;
                            woImage.ImagePath = Path.Combine(uploadsFolderPath, fileName);
                            woImage.Name = fileName;
                            woImage.UploadedBy = "Admin";
                            imagePaths.Add(woImage);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
            }
            return imagePaths;

        }
    }
}
