using AutoMapper;
using InteriorDesignWebAPI.Models.Domain;
using InteriorDesignWebAPI.Models.Dtos;

namespace InteriorDesignWebAPI
{
    public class MapperConfig
    {

        public static MapperConfiguration RegisterMaps()
        {
            var mapperConfig = new MapperConfiguration(config =>
            {
                //User Mapper
                config.CreateMap<ProjectDto, Project>();
                config.CreateMap<Project, ProjectDto>();
                config.CreateMap<VwProject, ProjectDto>();


                config.CreateMap<Room, RoomDto>();
                config.CreateMap<RoomDto, Room>();
                config.CreateMap<RoomTypeDto, RoomType>();


                config.CreateMap<WorkOrder, WorkOrderDto>();
                config.CreateMap<WorkOrderDto, WorkOrder>();
                config.CreateMap<VwWorkOrder, WorkOrderDto>();
                config.CreateMap<WorkOrderDto, VwWorkOrder>();
                config.CreateMap<SaveWorkOrderDto, WorkOrder>();
                
                config.CreateMap<WorkOrderItemDto, WorkOrderItem>();
                config.CreateMap<WorkOrderImage, WorkOrderImageDto>();

                config.CreateMap<Category, CategoryDto>();
                config.CreateMap<CategoryDto, Category>();
                
                config.CreateMap<PortfolioImage, PortfolioImageDto>();
                config.CreateMap<PortfolioImageDto, PortfolioImage>();

            });
            return mapperConfig;
        }
    }
}
