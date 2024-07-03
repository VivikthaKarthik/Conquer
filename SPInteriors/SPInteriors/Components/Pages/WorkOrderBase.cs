using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Components;
using SPInteriors.Models;
using SPInteriors.Services.Implementations;
using SPInteriors.Services.Interfaces;

namespace SPInteriors.Components.Pages
{
    public class WorkOrderBase : CommonBase
    {
        [Inject] IWorkOrderService workOrderService { get; set; }
        [Inject] IRoomService roomService { get; set; }
        [Inject] IFileUploadService FileUploadService { get; set; }
        [Inject] ICommonService commonService { get; set; }
        protected bool showModal;

        [Parameter]
        public string id { get; set; }

        [Parameter]
        public string roomId { get; set; }
        protected WorkOrderDto workOrder { get; set; }
        protected RoomDto room { get; set; }
        protected string src { get; set; }
        protected bool isDataFetchedCompletely = false;
        protected string RoomName { get; set; } = "Work Order";
        protected IBrowserFile SelectedImage { get; set; }
        protected List<ListItemDto> images { get; set; }
        protected bool isAdd { get; set; }

        protected bool reloadDropdown { get; set; }

        protected int selectedPartId { get; set; } = 0;
        protected string modalRequestType = "";

        protected void ShowModal()
        {
            showModal = true;
        }

        protected void CloseModal()
        {
            showModal = false;
        }

        protected async Task OnModelClosing(bool value)
        {
            showModal = value;
            reloadDropdown = true;
        }

        protected async override void OnInitialized()
        {
            if (!string.IsNullOrEmpty(id))
            {
                isAdd = false;
                workOrder = await workOrderService.GetWorkOrderByIdAsync(Convert.ToInt32(id));

                if (workOrder != null)
                {
                    RoomName = workOrder.Room;
                    src = workOrder.ImagePath;

                    images = await workOrderService.GetWorkOrderImagesAsync(workOrder.Id);
                }
            }
            else
            {
                workOrder = new WorkOrderDto();
                isAdd = true;
            }

            if (!string.IsNullOrEmpty(roomId))
            {
                room = await roomService.GetRoomListByIdAsync(Convert.ToInt32(roomId));

                if (room != null)
                {
                    workOrder.RoomId = room.Id;
                    RoomName = room.Name;

                    if (!string.IsNullOrEmpty(workOrder.WorkOrderItem) && workOrder.WorkOrderItem != "Not Applicable" && workOrder.WorkOrderItem != "Custom")
                    {
                        if (string.IsNullOrEmpty(workOrder.MaterialType))
                            workOrder.MaterialType = room.Material;

                        if (string.IsNullOrEmpty(workOrder.OuterFrameType))
                            workOrder.OuterFrameType = room.OuterFrame;

                    }
                }
            }

            isDataFetchedCompletely = true;
        }
        protected async Task ImageUploaded(InputFileChangeEventArgs e)
        {
            if (workOrder.Id <= 0)
            {
                using var stream = e.File.OpenReadStream();
                using var ms = new MemoryStream();
                await stream.CopyToAsync(ms);
                src = "data:" + e.File.ContentType + ";base64," + Convert.ToBase64String(ms.ToArray());
            }
            else
            {
                src = await FileUploadService.SaveWorkOrderImageAsync(e.File, workOrder.Id);
                if (images == null)
                    images = new List<ListItemDto>();
                images.Add(new ListItemDto() { Name = src });
            }
        }

        protected async Task OnBackClicked()
        {
            Navigate("room/edit/" + room.ProjectId + "/" + room.Id);
        }

        protected async Task OnWorkOrderItemUpdated(ListItemDto selectedItem)
        {
            workOrder.WorkOrderItemId = selectedItem.Id;
            workOrder.WorkOrderItem = selectedItem.Name;
            src = await workOrderService.GetWorkOrderItemImage(selectedItem.Id);
        }

        protected async Task OnSaveClicked()
        {
            bool isSuccess = false;
            string errorMessage = await Validate();
            if (string.IsNullOrEmpty(errorMessage))
            {
                if (isAdd)
                {
                    isSuccess = await workOrderService.CreateWorkOrderAsync(workOrder);

                    if (isSuccess && SelectedImage != null)
                    {
                        src = await FileUploadService.SaveWorkOrderImageAsync(SelectedImage, workOrder.Id);
                    }
                }
                else
                    isSuccess = await workOrderService.UpdateWorkOrderAsync(workOrder);

                if (isSuccess)
                    Navigate("room/edit/" + room.ProjectId + "/" + room.Id);
                else
                    ShowAlertMessage("Some problem occured.. Please try again");
            }
            else
            {
                ShowAlertMessage(errorMessage);
            }

        }

        protected async Task OnDeleteClicked()
        {
            var isDeleted = await workOrderService.DeleteWorkOrder(workOrder.Id);

            if (isDeleted)
            {
                ShowAlertMessage("Deleted " + workOrder.Name + " successfully !");
                Navigate("room/edit/" + room.ProjectId + "/" + room.Id);
            }
            else
            {
                ShowAlertMessage("Some error occured. Please try again !");
            }
        }

        protected async Task<string> Validate()
        {
            string errorMessage = string.Empty;

            if (string.IsNullOrEmpty(workOrder.Name))
            {
                errorMessage = "Name cannot be Empty";
            }
            else if (workOrder.WorkOrderItemId <= 0)
            {
                errorMessage = "Please Select WorkOrder Item";
            }
            else if (workOrder.Height <= 0 && workOrder.Width <= 0 && !workOrder.SuppressCalculation)
            {
                errorMessage = "Enter Measurements or Suppress Calculation";
            }
            else if (workOrder.SuppressCalculation && (workOrder.Amount == null || workOrder.Amount <= 0))
            {
                errorMessage = "Amount cannot be lessthan or equal to 0";
            }

            return errorMessage;
        }

        protected async Task AddPart(int workOrderId)
        {
            selectedPartId = 0;
            modalRequestType = "Add";
            ShowModal();
        }

        protected async Task EditPart(int serviceId, int roomId)
        {
            Navigate("/part/edit/" + id + "/" + serviceId);
        }

        protected async void Navigate(string url)
        {
            Navigate(url);
        }
    }
}
