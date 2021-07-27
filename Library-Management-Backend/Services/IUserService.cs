using System;
using System.Collections.Generic;
using LibraryManagement.Models;
namespace LibraryManagement.Services
{
    public interface IUserServices
    {
        List<UserModel> GetUsers();
        UserModel Get(int id);
        UserModel Add(UserModel user);
        UserModel Update(UserModel user);
        int Delete(int id);
    }
}