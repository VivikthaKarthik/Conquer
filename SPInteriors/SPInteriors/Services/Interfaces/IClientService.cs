using SPInteriors.Models;

namespace SPInteriors.Services.Interfaces
{
    public interface IClientService
    {
        Task<CommonResponseDto> GetClientByIdAsync(int id);
        Task<CommonResponseDto> GetClientsAsync();
        Task<CommonResponseDto> CreateClientAsync(ClientDto data);
        Task<CommonResponseDto> UpdateClientAsync(ClientDto data);
    }
}
