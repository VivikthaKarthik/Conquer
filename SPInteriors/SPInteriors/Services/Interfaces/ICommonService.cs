using SPInteriors.Models;

namespace SPInteriors.Services.Interfaces
{
    public interface ICommonService
    {
        string Dummy { get; set; }
        Task<List<ListItemDto>> GetListItems(string tableName, string parentName, int? parentId);
    }
}
