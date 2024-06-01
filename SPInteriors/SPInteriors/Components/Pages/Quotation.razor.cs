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
        bool isDataFetchedCompletely = false;

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
            isDataFetchedCompletely = true;
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
                if(workorder.Parts != null)
                {
                    foreach (var part in workorder.Parts)
                    {
                        if (part.WorkOrderType == "BOX")
                            unitPrice += part.Height * part.Width * BoxPrice;
                        else if (part.WorkOrderType == "LOFT")
                            unitPrice += part.Height * part.Width * FramePrice;
                        else if (part.WorkOrderType == "PANEL")
                            unitPrice += part.Height * part.Width * PanelPrice;
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
