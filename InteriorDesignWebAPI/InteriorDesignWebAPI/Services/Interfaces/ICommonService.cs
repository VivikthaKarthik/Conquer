using InteriorDesignWebAPI.Models.Dtos;

namespace InteriorDesignWebAPI.Services.Interfaces
{
    public interface ICommonService
    {
        Task<ResponseDto> GetListItems(string tableName, string parentName, int? parentId);
        Task<ResponseDto> GetMainMenu(string pageName);
    }
}
