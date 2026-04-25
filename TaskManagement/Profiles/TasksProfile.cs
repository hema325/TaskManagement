using AutoMapper;
using TaskManagement.Dtos.Tasks;
using TaskManagement.Entities;

namespace TaskManagement.Profiles
{
    public class TasksProfile: Profile
    {
        public TasksProfile()
        {
            CreateMap<CreateTaskDto, TaskEntry>();
            CreateMap<UpdateTaskDto, TaskEntry>();
            CreateMap<TaskEntry, TaskDto>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.User.UserName));
        }
    }
}
