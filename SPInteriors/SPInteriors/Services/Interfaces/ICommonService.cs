using SPInteriors.Models;

namespace SPInteriors.Services.Interfaces
{
    public interface ICommonService
    {
        Task<List<ListItemDto>> GetListItems(string tableName, string parentName, int? parentId);
    }
}
