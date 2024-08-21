using InteriorDesignWebAPI.Models.Domain;
using InteriorDesignWebAPI.Models.Dtos;
using InteriorDesignWebAPI.Services.Interfaces;
using Microsoft.Data.SqlClient;
using System.Text;

namespace InteriorDesignWebAPI.Services
{
    public class CommonService : ICommonService
    {
        private IConfiguration config;
        public CommonService(IConfiguration configuration)
        {
            config = configuration;
        }

        public async Task<ResponseDto> GetListItems(string tableName, string parentName, int? parentId)
        {
            ResponseDto response = new ResponseDto();
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

                        response.Result = listItems;
                        response.IsSuccess = true;
                    }
                }
            }

            return response;
        }

        public async Task<ResponseDto> GetMainMenu(string pageName)
        {
            ResponseDto response = new ResponseDto();

            List<string> menuItems = new List<string>() { "Home", "Projects" };

            StringBuilder sb = new StringBuilder();

            sb.Append("<ul>"); 
            sb.Append((pageName == "Home"? "<li class='active'>" : "<li>") + "<a href='index-2.html'>Home</a></li>");
            sb.Append((pageName == "About" ? "<li class='active'>" : "<li>") + "<a href='about.html'>About</a></li>");
            sb.Append((pageName == "Projects" || pageName == "Rooms" ? "<li class='active'>" : "<li>") + "<a href='projects.html'>Projects</a></li>");
            sb.Append("<li><a href=\"contact.html\">Contact</a></li>");

            response.Result = sb.ToString();
            response.IsSuccess = true;
            return response;
        }
    }
}
