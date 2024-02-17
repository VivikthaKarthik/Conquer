using AutoMapper;
using ConquerAPI.Models.Domain;
using ConquerAPI.DTOs;

namespace ConquerAPI
{
    public class MappingConfig
    {
        public static MapperConfiguration RegisterMaps()
        {
            var mappingConfig = new MapperConfiguration(config =>
            {
                config.CreateMap<CallVolumeDto, CallVolume>();
                config.CreateMap<CallVolume, CallVolumeDto>();

                config.CreateMap<UserDto, User>();
                config.CreateMap<User, UserDto>();
            });
            return mappingConfig;
        }
    }
}
