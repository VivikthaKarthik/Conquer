using Azure;
using Microsoft.EntityFrameworkCore;
using SPInteriors.Components.Pages;
using SPInteriors.Models;
using SPInteriors.Models.Domain;
using SPInteriors.Services.Interfaces;

namespace SPInteriors.Services.Implementations
{
    public class ClientService : IClientService
    {
        private readonly SpinteriorsContext dbContext;
        public ClientService(SpinteriorsContext _dbContext)
        {
            dbContext = _dbContext;
        }
        public async Task<CommonResponseDto> GetClientByIdAsync(int id)
        {
            CommonResponseDto response = new CommonResponseDto();
            try
            {
                if (dbContext.Clients.Any(x => x.Id == id))
                {
                    var data = dbContext.Clients.First(x => x.Id == id);

                    ClientDto client = new ClientDto();
                    client.Id = data.Id;
                    client.Name = data.Name;
                    client.MobileNumber = data.MobileNumber;
                    client.Email = data.Email;
                    client.Address = data.Address;

                    response.Result = client;
                    response.IsSuccess = true;
                }
            }
            catch(Exception ex)
            {
                response.IsSuccess = false;
                response.ErrorMessage = ex.Message;
            }
            return response;
        }
        public async Task<CommonResponseDto> GetClientsAsync()
        {
            CommonResponseDto response = new CommonResponseDto();
            try
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
                response.Result = clients;
                response.IsSuccess = true;
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ErrorMessage = ex.Message;
            }
            return response;
        }
        public async Task<CommonResponseDto> CreateClientAsync(ClientDto data)
        {
            CommonResponseDto response = new CommonResponseDto();
            try
            {
                Models.Domain.Client client = new Models.Domain.Client();

                if (data != null)
                {
                    client.Name = data.Name;
                    client.MobileNumber = data.MobileNumber;
                    client.Email = data.Email;
                    client.Address= data.Address;
                    client.IsActive = true;

                    dbContext.Clients.Add(client);
                    await dbContext.SaveChangesAsync();
                }
                response.IsSuccess = true;
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ErrorMessage = ex.Message;
            }
            return response;
        }
        public async Task<CommonResponseDto> UpdateClientAsync(ClientDto data)
        {
            CommonResponseDto response = new CommonResponseDto();
            try
            {
                if (data != null && data.Id > 0)
                {
                    var client = dbContext.Clients.FirstOrDefault(s => s.Id == data.Id);

                    if (client != null)
                    {
                        client.Name = data.Name;
                        client.MobileNumber = data.MobileNumber;
                        client.Email = data.Email;
                        client.Address = data.Address;
                        await dbContext.SaveChangesAsync();
                    }
                }
                response.IsSuccess = true;
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ErrorMessage = ex.Message;
            }
            return response;
        }          
    }
}
