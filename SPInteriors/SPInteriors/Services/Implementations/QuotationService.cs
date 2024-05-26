using Microsoft.IdentityModel.Tokens;
using SPInteriors.Components.Pages;
using SPInteriors.Models;
using SPInteriors.Models.Domain;
using SPInteriors.Services.Interfaces;
using System.Collections.Generic;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using static iTextSharp.text.pdf.AcroFields;

namespace SPInteriors.Services.Implementations
{
    public class QuotationService : IQuotationService
    {
        private readonly SpinteriorsContext dbContext;
        //private readonly IMapper mapper;
        public QuotationService(SpinteriorsContext _dbContext)
        {
            dbContext = _dbContext;
            //mapper = _mapper;
        }
        public async Task<List<QuotationDto>> GetQuotationListAsync(string clietnName)
        {
            var quotations = await GetQuotationListAsync();
            return quotations.ToList();
        }
        public async Task<List<QuotationDto>> GetQuotationListAsync()
        {
            List<QuotationDto> list = new List<QuotationDto>();
            return list;
        }

        public async Task<QuotationDto> GetQuotationByIdAsync(int id)
        {
            QuotationDto quotation = new QuotationDto();

            if (dbContext.Projects.Any(x => x.Id == id))
            {
                var project = dbContext.Projects.First(x => x.Id == id);

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

                if (dbContext.Rooms.Any(x => x.ProjectId == id))
                {
                    quotation.Rooms = new List<RoomInfo>();
                    var rooms = dbContext.VwRooms.Where(x => x.ProjectId == id).ToList();

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

                                if (dbContext.WorkOrderDetails.Any(x => x.WorkOrderId == workOrder.Id))
                                {
                                    workOrderInfo.Details = new List<WorkOrderDetailsDto>();
                                    var details = dbContext.WorkOrderDetails.Where(x => x.WorkOrderId == workOrder.Id).ToList();

                                    if (details != null && details.Count > 0)
                                    {
                                        foreach(var detail in  details)
                                        {
                                            WorkOrderDetailsDto detailDto = new WorkOrderDetailsDto();
                                            detailDto.Id = detail.Id;
                                            detailDto.Name = detail.Name;
                                            detailDto.Value = detail.Value;

                                            workOrderInfo.Details.Add(detailDto);
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

            
            return quotation;
        }

    }
}
