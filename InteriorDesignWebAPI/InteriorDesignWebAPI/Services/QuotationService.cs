using AutoMapper;
using InteriorDesignWebAPI.Models.Domain;
using InteriorDesignWebAPI.Models.Dtos;
using InteriorDesignWebAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace InteriorDesignWebAPI.Services
{
    public class QuotationService : IQuotationService
    {
        private readonly InteriorDesignContext dbContext;
        private readonly IMapper mapper;

        public QuotationService(InteriorDesignContext _dbContext, IMapper _mapper)
        {
            dbContext = _dbContext;
            mapper = _mapper;
        }

        public async Task<ResponseDto> GetPartTypesAsync()
        {
            ResponseDto response = new ResponseDto();
            PartTypeDto partType = new PartTypeDto();

            partType.BoxPrice = dbContext.WorkOrderTypes.FirstOrDefault(x=>x.Name == "BOX").Price.ToString();
            partType.FramePrice = dbContext.WorkOrderTypes.FirstOrDefault(x => x.Name == "FRAME").Price.ToString();
            partType.PanelPrice = dbContext.WorkOrderTypes.FirstOrDefault(x => x.Name == "PANEL").Price.ToString();
            response.Result = partType;
            response.IsSuccess = true;

            return response;
        }


        public async Task<ResponseDto> GetQuotationByIdAsync(int projectId)
        {
            ResponseDto response = new ResponseDto();

            QuotationDto quotation = new QuotationDto();

            if (dbContext.Projects.Any(x => x.Id == projectId))
            {
                var project = dbContext.Projects.First(x => x.Id == projectId);

                quotation.IssuedDate = DateTime.Now;
                quotation.DueDate = DateTime.Now.AddMonths(2);

                if (project.ClientId > 0)
                {
                    var client = dbContext.Clients.First(x => x.Id == project.ClientId);
                    ClientAddress address = new ClientAddress();
                    address.Title = "Mr.";
                    address.ClientName = client.Name;
                    address.FirstAddress = "A 1-Block, Flat No - 201,";
                    address.SecondAddress = "Nest Apartment, Manikonda.";

                    quotation.Address = address;
                }

                if (dbContext.Rooms.Any(x => x.ProjectId == projectId))
                {
                    quotation.Rooms = new List<RoomInfo>();
                    var rooms = dbContext.VwRooms.Where(x => x.ProjectId == projectId).ToList();

                    var workOrderTypes = dbContext.WorkOrderTypes.ToList();
                    foreach (var item in rooms)
                    {
                        RoomInfo roomInfo = new RoomInfo();

                        if (dbContext.WorkOrders.Any(x => x.RoomId == item.Id))
                        {
                            roomInfo.WorkOrders = new List<WorkOrderInfo>();

                            var workOrders = dbContext.VwWorkOrders.Where(x => x.RoomId == item.Id).ToList();

                            foreach (var workOrder in workOrders)
                            {
                                WorkOrderInfo workOrderInfo = new WorkOrderInfo();
                                workOrderInfo.Id = workOrder.Id;
                                workOrderInfo.Name = workOrder.Name;
                                workOrderInfo.WorkOrderItem = workOrder.WorkOrderItem;
                                workOrderInfo.WorkOrderType = workOrder.WorkOrderType ?? "";
                                workOrderInfo.Height = workOrder.Height;
                                workOrderInfo.Width = workOrder.Width;
                                workOrderInfo.Quantity = 1;
                                workOrderInfo.SuppressCalculation = workOrder.SuppressCalculation;
                                workOrderInfo.Amount = workOrder.Amount != null ? workOrder.Amount.Value : 0;

                                if (workOrder.SuppressCalculation)
                                {
                                    workOrderInfo.UnitPrice = Convert.ToDecimal(workOrder.Amount);
                                }
                                else
                                {
                                    workOrderInfo.UnitPrice = 0;
                                }

                                if (dbContext.WorkOrderParts.Any(x => x.WorkOrderId == workOrder.Id))
                                {
                                    var parts = dbContext.WorkOrderParts.Where(x => x.WorkOrderId == workOrder.Id).ToList();

                                    if (parts != null && parts.Count > 0)
                                    {
                                        workOrderInfo.Parts = new List<WorkOrderPartDto>();

                                        foreach (var part in parts)
                                        {
                                            WorkOrderPartDto partDto = new WorkOrderPartDto();
                                            partDto.Id = part.Id;
                                            partDto.WorkOrderId = part.WorkOrderId;
                                            partDto.WorkOrderTypeId = part.WorkOrderTypeId;
                                            partDto.Height = part.Height;
                                            partDto.Width = part.Width;

                                            if (workOrderTypes.Any(x => x.Id == part.WorkOrderTypeId))
                                                partDto.WorkOrderType = workOrderTypes.First(x => x.Id == part.WorkOrderTypeId).Name;

                                            workOrderInfo.Parts.Add(partDto);
                                        }
                                    }
                                }



                                roomInfo.WorkOrders.Add(workOrderInfo);
                            }
                        }
                        quotation.Rooms.Add(roomInfo);
                    }
                }

                quotation.MaterialsUsed = new List<Material>();
                quotation.MaterialsUsed.Add(new Material()
                {
                    Name = "Plywood",
                    Type = "Century  710 BWP"
                }); quotation.MaterialsUsed.Add(new Material()
                {
                    Name = "Laminate",
                    Type = "Virgo and Croma or any other brand upto 2000"
                }); quotation.MaterialsUsed.Add(new Material()
                {
                    Name = "Hardware",
                    Type = "Hettich hinges and chanells"
                });
            }

            response.Result = quotation;
            response.IsSuccess = true;

            return response;
        }
    }
}
