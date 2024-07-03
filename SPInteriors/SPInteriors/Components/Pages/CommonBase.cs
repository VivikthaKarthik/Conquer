using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using SPInteriors.Models;
using SPInteriors.Models.Domain;

namespace SPInteriors.Components.Pages
{
    public class CommonBase : ComponentBase
    {

        [Inject] IJSRuntime jsRuntime { get; set; }
        [Inject] NavigationManager navigationManager { get; set; }
        public void ShowAlertMessage(string errorMessage)
        {
            if(!string.IsNullOrEmpty(errorMessage))
                jsRuntime.InvokeVoidAsync("ShowAlert", errorMessage);
        }

        public void Navigate(string url, bool forceUpload = true)
        {
            if(!string.IsNullOrEmpty(url))
            {
                navigationManager.NavigateTo(url, forceUpload);
            }
            else
            {
                jsRuntime.InvokeVoidAsync("ShowAlert", "Incorrect URL");
            }
        }
        protected async Task SetupPage(bool firstRender)
        {
            if (firstRender)
            {
                await jsRuntime.InvokeVoidAsync("stopLoader");
            }
        }

        public async Task ShowLoader()
        {
             await jsRuntime.InvokeVoidAsync("showLoader");
        }
    }
}
