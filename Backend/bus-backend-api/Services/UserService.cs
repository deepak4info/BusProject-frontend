using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Interface;
using WebApplication1.Models;

namespace WebApplication1.Services
{
    public class UserService : IUserInterface
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }


        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            var res = await _context.UserRegistration.ToListAsync();
            return res;
        }


        public async Task<User?> GetUserByIdAsync(int id)
        {
            return await _context.UserRegistration.FindAsync(id);
        }

        public async Task<User> CreateUserAsync(User user)
        {
            user.CreatedDate = DateTime.UtcNow;
            _context.UserRegistration.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        //public async Task<User?> UpdateUserAsync(int id, User user)
        //{
        //    var existingUser = await _context.UserDetails.FindAsync(id);
        //    if (existingUser == null) return null;

        //    existingUser.FirstName = user.FirstName;
        //    existingUser.LastName = user.LastName;
        //    existingUser.Email = user.Email;
        //    existingUser.Phone = user.Phone;
        //    existingUser.Address = user.Address;
        //    existingUser.ModifiedDate = DateTime.UtcNow;
        //    existingUser.ModifiedBy = user.ModifiedBy;
        //    existingUser.IsActive = user.IsActive;
        //    existingUser.RoleID = user.RoleID;
        //    existingUser.Image = user.Image;

        //    await _context.SaveChangesAsync();
        //    return existingUser;
        //}

        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await _context.UserRegistration.FindAsync(id);
            if (user == null) return false;

            _context.UserRegistration.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }

        public Task<User?> UpdateUserAsync(int id, User user)
        {
            throw new NotImplementedException();
        }
    }
}
