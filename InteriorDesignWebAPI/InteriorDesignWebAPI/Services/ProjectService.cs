using InteriorDesignWebAPI.Models.Domain;
using InteriorDesignWebAPI.Models.Dtos;
using InteriorDesignWebAPI.Services.Interfaces;

namespace InteriorDesignWebAPI.Services
{
    public class ProjectService : IProjectService
    {
        private readonly SpinteriorsContext dbContext;
        //private readonly IMapper mapper;
        public ProjectService(SpinteriorsContext _dbContext)
        {
            dbContext = _dbContext;
            //mapper = _mapper;
        }

        public async Task<ResponseDto> GetProjectById(int id)
        {
            ResponseDto response = new ResponseDto();
            try
            {
                if (dbContext.VwProjects.Any(x => x.Id == id))
                {
                    var data = dbContext.VwProjects.First(x => x.Id == id);
                    ProjectDto project = new ProjectDto();
                    project.Id = data.Id;
                    project.Name = data.Name;
                    project.ClientId = data.ClientId;
                    project.ClientName = data.ClientName;
                    project.StatusId = data.StatusId;
                    project.Status = data.Status;
                    project.HouseType = data.HouseType;
                    project.HouseTypeId = data.HouseTypeId;
                    project.ImagePath = data.ImagePath;
                    project.Material = data.MaterialType;
                    project.MaterialId = data.MaterialTypeId;
                    project.OuterFrame = data.OuterFrameType;
                    project.OuterFrameId = data.OuterFrameTypeId;
                    response.Result = project;
                    response.IsSuccess = true;
                }
                else
                {
                    response.Message = "Not Found";
                }
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
            }
            return response;
        }


        public async Task<ResponseDto> GetRoomsByProjectId(int projectId)
        {
            ResponseDto response = new ResponseDto();
            try
            {
                if (dbContext.Rooms.Any(x => x.ProjectId == projectId))
                {
                    List<RoomDto> list = new List<RoomDto>();
                    var roomTypes = dbContext.RoomTypes.ToList();
                    var listItems = dbContext.Rooms.Where(x => x.ProjectId == projectId).ToList();
                    foreach (var item in listItems)
                    {
                        RoomDto room = new RoomDto();
                        room.Id = item.Id;
                        room.Name = item.Name;

                        if (item.RoomTypeId > 0)
                        {
                            room.ImagePath = roomTypes.First(x => x.Id == item.RoomTypeId).ImagePath;
                        }
                        list.Add(room);
                    }
                    response.Result = list;
                    response.IsSuccess = true;
                }
                else
                {
                    response.Message = "Not Found";
                }
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
            }
            return response;
        }

    }
}
