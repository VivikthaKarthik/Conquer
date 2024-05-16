using AutoMapper;

namespace SPInteriors
{
    public class MapperConfig
    {
        public static MapperConfiguration RegisterMaps()
        {
            var mapperConfig = new MapperConfiguration(config =>
            {
                ////User Mapper
                //config.CreateMap<UserDto, User>();
                //config.CreateMap<User, UserResponseDto>();

                
            });
            return mapperConfig;
        }
    }
}
