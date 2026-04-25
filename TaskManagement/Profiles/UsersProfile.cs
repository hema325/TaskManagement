using AutoMapper;
using TaskManagement.Dtos.Users;
using TaskManagement.Entities;

namespace TaskManagement.Profiles
{
    public class UsersProfile: Profile
    {
        public UsersProfile()
        {
            CreateMap<CreateUserDto, User>()
                .ForMember(src => src.Permissions, opt => opt.MapFrom(dest => dest.Permissions.Select(p => new Permission { Value = p})));
            
            CreateMap<User, UserDto>()
                .ForMember(src => src.Permissions, opt => opt.MapFrom(dest => dest.Permissions.Select(p => p.Value)));
        }
    }
}
