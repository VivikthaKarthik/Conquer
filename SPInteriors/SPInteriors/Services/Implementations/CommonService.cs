using Microsoft.Data.SqlClient;
using SPInteriors.Models;
using SPInteriors.Models.Domain;
using SPInteriors.Services.Interfaces;

namespace SPInteriors.Services.Implementations
{
    public class CommonService : ICommonService
    {
        private IConfiguration config;
        private readonly SpinteriorsContext dbContext;
        public CommonService(SpinteriorsContext _dbContext, IConfiguration configuration)
        {
            config = configuration;
            this.dbContext = _dbContext;
        }

        public async Task<List<ListItemDto>> GetListItems(string tableName, string parentName, int? parentId)
        {
            List<ListItemDto> listItems = new List<ListItemDto>();
            string connectionString = config["ConnectionStrings:SqlConnectionString"];
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();

                string query = string.Empty;

                if (!string.IsNullOrEmpty(parentName) && parentId > 0)
                {
                    query = "Select Id, Name from " + tableName + " Where " + parentName + "Id" + " = " + parentId;
                }
                else
                {
                    query = "Select Id, Name from " + tableName;
                }
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            ListItemDto item = new ListItemDto()
                            {
                                Id = reader.GetInt32(0),
                                Name = reader.GetString(1)
                            };
                            listItems.Add(item);
                        }
                    }
                }
            }

            return listItems;
        }
    }
}
