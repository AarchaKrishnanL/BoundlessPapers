﻿namespace OnlineBookStore.DTO.UserDto
{
    public class PutUserDto
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }

        public string MobileNumber { get; set; }
        public string Email { get; set; }
        public string UserType { get; set; }
    }
}