using Microsoft.EntityFrameworkCore;
using SPInteriors.Models;
using SPInteriors.Models.Domain;
using SPInteriors.Services.Interfaces;

namespace SPInteriors.Services.Implementations
{
    public class ClientService : IClientService
    {
        private readonly SpinteriorsContext dbContext;
        //private readonly IMapper mapper;
        public ClientService(SpinteriorsContext _dbContext)
        {
            dbContext = _dbContext;
            //mapper = _mapper;
        }
        public async Task<ClientDto> GetClientByIdAsync(int id)
        {
            ClientDto client = new ClientDto();

            if (dbContext.Clients.Any(x => x.Id == id))
            {
                var data = dbContext.Clients.First(x => x.Id == id);
                client.Id = data.Id;
                client.Name = data.Name;
                client.MobileNumber = data.MobileNumber;
                client.Email = data.Email;
                client.Address = data.Address;
            }
            return client;
        }

        public async Task<List<ClientDto>> GetClientsAsync()
        {
            List<ClientDto> clients = new List<ClientDto>();

            if (dbContext.Clients.Any())
            {
                var data = dbContext.Clients.ToList();

                foreach (var item in data)
                {
                    ClientDto client = new ClientDto();
                    client.Id = item.Id;
                    client.Name = item.Name;
                    client.MobileNumber = item.MobileNumber;
                    client.Email = item.Email;
                    client.Address = item.Address;

                    clients.Add(client);
                }
            }
            return clients;
        }
    }
}
