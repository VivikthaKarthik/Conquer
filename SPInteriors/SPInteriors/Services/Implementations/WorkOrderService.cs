using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using SPInteriors.Components.Pages;
using SPInteriors.Models;
using SPInteriors.Models.Domain;
using SPInteriors.Services.Interfaces;
using System.util;
using static iTextSharp.text.pdf.AcroFields;
using static System.Runtime.InteropServices.JavaScript.JSType;


namespace SPInteriors.Services.Implementations
{
    public class WorkOrderService : IWorkOrderService
    {
        private readonly SpinteriorsContext dbContext;
        private readonly IWebHostEnvironment _environment;
        //private readonly IMapper mapper;
        public WorkOrderService(IWebHostEnvironment environment, SpinteriorsContext _dbContext)
        {
            dbContext = _dbContext;
            _environment = environment;
            //mapper = _mapper;
        }

        public async Task<WorkOrderDto> GetWorkOrderByIdAsync(int id)
        {
            WorkOrderDto workorder = new WorkOrderDto();
            decimal height = 0;
            decimal width = 0;
            if (dbContext.VwWorkOrders.Any(x => x.Id == id))
            {
                var data = dbContext.VwWorkOrders.First(x => x.Id == id);
                workorder.Id = data.Id;
                workorder.Name = data.Name;
                workorder.WorkOrderItemId = data.WorkOrderItemId;
                workorder.WorkOrderType = data.WorkOrderType;
                workorder.OuterFrameType = data.OuterFrameType;
                workorder.RoomTypeId = data.RoomTypeId;
                workorder.RoomId = data.RoomId;
                workorder.Room = data.Room;
                workorder.Height = data.Height;
                workorder.Width = data.Width;
                workorder.DesignType = data.DesignType;
                workorder.MaterialType = data.MaterialType;
                workorder.SuppressCalculation = data.SuppressCalculation;
                workorder.Amount = data.Amount;

                if(dbContext.WorkOrderImages.Any(x=>x.WorkOrderId == id))
                {
                    workorder.ImagePath = dbContext.WorkOrderImages.First(x => x.WorkOrderId == id).ImagePath;
                }

                if (dbContext.WorkOrderParts.Any(x => x.WorkOrderId == id))
                {
                    workorder.Parts = new List<WorkOrderPartDto>();
                    var partsList = dbContext.WorkOrderParts.Where(x => x.WorkOrderId == id).ToList();

                    var workOrderTypes = dbContext.WorkOrderTypes.ToList();

                    foreach(var item in partsList)
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
            }

            if (height > 0)
                workorder.Height = height;

            if (width > 0)
                workorder.Width = width;

            return workorder;
        }
        
        public async Task<WorkOrderDto> GetWorkOrderAsync(int id)
        {
            WorkOrderDto workorder = new WorkOrderDto();

            if (dbContext.WorkOrders.Any(x => x.Id == id))
            {
                var data = dbContext.WorkOrders.First(x => x.Id == id);
                workorder.Id = data.Id;
                workorder.Name = data.Name;
                workorder.WorkOrderItemId = data.WorkOrderItemId;
                workorder.WorkOrderType = data.WorkOrderType;
                workorder.OuterFrameType = data.OuterFrameType;
                workorder.RoomId = data.RoomId;
                workorder.DesignType = data.DesignType;
                workorder.MaterialType = data.MaterialType;
                workorder.SuppressCalculation = data.SuppressCalculation;
                workorder.Amount = data.Amount;

                if(workorder.RoomId > 0)
                {
                    var room = dbContext.Rooms.First(x => x.Id == workorder.RoomId);
                    workorder.ProjectId = room.ProjectId;
                    workorder.Room = room.Name?? "";
                    if (workorder.ProjectId > 0)
                    {
                        workorder.ProjectName = dbContext.Projects.First(x => x.Id == workorder.ProjectId).Name;
                    }
                }

            }
            return workorder;
        }

        public async Task<WorkOrderPartDto> GetWorkOrderPartsAsync(int id)
        {
            WorkOrderPartDto part = new WorkOrderPartDto();

            if (dbContext.WorkOrderParts.Any(x => x.Id == id))
            {
                var data = dbContext.WorkOrderParts.First(x => x.Id == id);
                part.Id = data.Id;
                part.WorkOrderId = data.WorkOrderId;
                part.WorkOrderTypeId = data.WorkOrderTypeId;
                part.Width = data.Width;
                part.Height = data.Height;
                                
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

                part.WorkOrder = await GetWorkOrderAsync(part.WorkOrderId);
                if (part.WorkOrderTypeId > 0)
                    part.WorkOrderType = dbContext.WorkOrderTypes.First(x => x.Id == part.WorkOrderTypeId).Name;
            }
            return part;
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
        public async Task<bool> CreateWorkOrderPartAsync(WorkOrderPartDto data, List<WorkOrderPropertyDto> properties)
        {
            try
            {
                Models.Domain.WorkOrderPart part = new Models.Domain.WorkOrderPart();

                if (data != null)
                {
                    part.WorkOrderId = data.WorkOrderId;
                    part.WorkOrderTypeId = data.WorkOrderTypeId;
                    part.Width = data.Width;
                    part.Height = data.Height;
                    part.Notes = data.Notes;

                    dbContext.WorkOrderParts.Add(part);
                    await dbContext.SaveChangesAsync();


                    if (properties != null && properties.Count > 0)
                    {
                        foreach (var property in properties)
                        {
                            foreach (var value in property.SelectedValues)
                            {
                                WorkOrderDetail detail = new WorkOrderDetail();
                                detail.WorkOrderId = part.Id;
                                detail.Name = value.Name;
                                detail.Value = value.Value;

                                dbContext.WorkOrderDetails.Add(detail);
                            }
                        }
                    }
                    await dbContext.SaveChangesAsync();
                }
            }
            catch (Exception ex)
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

        public async Task<bool> UpdateWorkOrderPartAsync(WorkOrderPartDto data, List<WorkOrderPropertyDto> properties)
        {
            if (data != null && data.Id > 0)
            {
                try
                {
                    var workorderPart = dbContext.WorkOrderParts.FirstOrDefault(s => s.Id == data.Id);

                    if (workorderPart != null)
                    {
                        workorderPart.WorkOrderTypeId = data.WorkOrderTypeId;
                        workorderPart.WorkOrderId = data.WorkOrderId;
                        workorderPart.Width = data.Width;
                        workorderPart.Height = data.Height;

                        await dbContext.SaveChangesAsync();



                        if (properties != null && properties.Count > 0)
                        {
                            foreach (var property in properties)
                            {
                                foreach (var value in property.SelectedValues)
                                {
                                    if (!dbContext.WorkOrderDetails.Any(x => x.WorkOrderId == workorderPart.Id && x.Name == property.Name && x.Value == value.Value))
                                    {
                                        WorkOrderDetail detail = new WorkOrderDetail();
                                        detail.WorkOrderId = workorderPart.Id;
                                        detail.Name = value.Name;
                                        detail.Value = value.Value;

                                        dbContext.WorkOrderDetails.Add(detail);
                                    }
                                }
                            }
                        }
                        await dbContext.SaveChangesAsync();
                    }
                }
                catch (Exception ex)
                {

                }
            }
            return true;
        }

        public async Task<List<WorkOrderPropertyDto>> GetWorkOrderPropertiesAsync()
        {
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
                    foreach(var field in fields)
                    {
                        WorkOrderPropertyFieldDto item = new WorkOrderPropertyFieldDto();
                        item.Id = field.Id;
                        item.Name = field.Name;

                        property.Fields.Add(item);
                    }
                }

                properties.Add(property);
            }
            return properties;
        }

        public async Task<List<ListItemDto>> GetWorkOrderImagesAsync(int workOrderId)
        {
            List<ListItemDto> images = new List<ListItemDto>();
            var listItems = dbContext.WorkOrderImages.Where(x => x.WorkOrderId == workOrderId).ToList();

            if (listItems.Any())
            {
                foreach (var data in listItems)
                {
                    ListItemDto image = new ListItemDto();
                    image.Id = data.Id;
                    image.Name = data.ImagePath;

                    images.Add(image);
                }
            }
            return images;
        }

        public async Task<bool> DeleteWorkOrderPart(int id)
        {
            bool isDeleted = false;

            if (dbContext.WorkOrderParts.Any(x => x.Id == id))
            {
                var part = dbContext.WorkOrderParts.First(x => x.Id == id);

                if(dbContext.WorkOrderDetails.Any(x => x.WorkOrderId == id))
                {
                    var details = dbContext.WorkOrderDetails.Where(x => x.WorkOrderId == id);
                    dbContext.WorkOrderDetails.RemoveRange(details);
                }
                dbContext.WorkOrderParts.Remove(part);

                dbContext.SaveChangesAsync();
                isDeleted = true;
            }

            return isDeleted;
        }


        public async Task<bool> DeleteWorkOrder(int id)
        {
            bool isDeleted = false;

            if (dbContext.WorkOrders.Any(x => x.Id == id))
            {
                var workOrder = dbContext.WorkOrders.First(x => x.Id == id);

                if (dbContext.WorkOrderParts.Any(x => x.WorkOrderId == id))
                {
                    var parts = dbContext.WorkOrderParts.Where(x => x.WorkOrderId == id);

                    foreach(var part in parts)
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
                isDeleted = true;
            }

            return isDeleted;
        }

        public async Task<bool> CreateWorkOrderItemAsync(IBrowserFile image, int roomId, CreateWorkOrderItemDto data)
        {
            try
            {
                string filePath = "";
                if (image != null)
                {
                    var uploadPath = Path.Combine(_environment.WebRootPath, "ImageVault");

                    if (!Directory.Exists(uploadPath))
                    {
                        Directory.CreateDirectory(uploadPath);
                    }

                    var actualFilePath = Path.Combine(uploadPath, image.Name);
                    filePath = "ImageVault/Default Images/WorkItems/" + image.Name;

                    using (var stream = new FileStream(actualFilePath, FileMode.Create))
                    {
                        await image.OpenReadStream().CopyToAsync(stream);
                    }
                }
                Models.Domain.WorkOrderItem workOrderItem = new Models.Domain.WorkOrderItem();

                if (data != null)
                {
                    workOrderItem.Name = data.Name;
                    workOrderItem.Description = data.Description;
                    workOrderItem.RoomTypeId = roomId;
                    workOrderItem.ImagePath = filePath;

                    dbContext.WorkOrderItems.Add(workOrderItem);
                    await dbContext.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                return false;
            }
            return true;
        }
    }
}
