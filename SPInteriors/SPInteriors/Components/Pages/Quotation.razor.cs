using Microsoft.AspNetCore.Components;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.JSInterop;
using SPInteriors.Models;
using SPInteriors.Models.Domain;
using SPInteriors.Services.Implementations;
using SPInteriors.Services.Interfaces;

namespace SPInteriors.Components.Pages
{
    public partial class Quotation
    {
        [Inject]
        protected IJSRuntime jsRuntime { get; set; }

        [Inject]
        protected NavigationManager navigationManager { get; set; }

        [Inject]
        protected IQuotationService quotationService { get; set; }


        [Parameter]
        public string projectId { get; set; }

        private string clientName { get; set; }

        private QuotationDto quotation { get; set; }

        private bool showLoader { get; set; }

        private int BoxPrice { get; set; } = 1000;
        private int PanelPrice { get; set; } = 1100;
        private int FramePrice { get; set; } = 1200;

        protected async override void OnInitialized()
        {
            if (quotation == null && !string.IsNullOrEmpty(projectId) && Convert.ToInt32(projectId) > 0)
            {
                quotation = await quotationService.GetQuotationByIdAsync(Convert.ToInt32(projectId));
            }
        }

        protected async override void OnAfterRender(bool firstRender)
        {
            await jsRuntime.InvokeVoidAsync("Calculate");
        }

        async Task GeneratePDF()
        {
            await jsRuntime.InvokeVoidAsync("SaveFile", "pdf-content");
        }

        async Task Calculate()
        {
            showLoader = true;
            if (quotation != null && quotation.Rooms != null)
            {
                foreach (var room in quotation.Rooms)
                {
                    if (room.WorkOrders != null)
                    {
                        foreach (var workorder in room.WorkOrders)
                        {
                            workorder.UnitPrice = Convert.ToDecimal(await GetUnitPrice(workorder));
                        }
                    }
                }
            }
            showLoader = false;
        }

        private async Task<string> GetUnitPrice(WorkOrderInfo workorder)
        {
            decimal unitPrice = 0;
            if (workorder.SuppressCalculation)
            {
                unitPrice = Convert.ToDecimal(workorder.Amount);
            }
            else
            {
                var workOrderDetail = workorder.Details.First(x => x.Name == "Type");
                if (workOrderDetail != null && !string.IsNullOrEmpty(workOrderDetail.Name))
                {
                    if (workOrderDetail.Value.ToUpper() == "BOX")
                    {
                        unitPrice = workorder.Height * workorder.Width * BoxPrice;
                    }
                    else if (workOrderDetail.Value.ToUpper() == "LOFT")
                    {
                        unitPrice = workorder.Height * workorder.Width * FramePrice;
                    }
                    else if (workOrderDetail.Value.ToUpper() == "PANEL")
                    {
                        unitPrice = workorder.Height * workorder.Width * PanelPrice;
                    }
                }
            }
            workorder.UnitPrice = unitPrice;
            return unitPrice.ToString("#,##0.00");
        }


        private async void Navigate(string url)
        {
            navigationManager.NavigateTo(url, false);
        }
    }
}
