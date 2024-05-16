using SPInteriors.Models;

namespace SPInteriors.Services.Interfaces
{
    public interface IClientService
    {
        Task<ClientDto> GetClientByIdAsync(int id);
        Task<List<ClientDto>> GetClientsAsync();
    }
}
