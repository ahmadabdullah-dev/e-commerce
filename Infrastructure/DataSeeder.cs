using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure;

public class DataSeeder
{
    private readonly UserManager<AppUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public DataSeeder(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        _userManager = userManager;
        _roleManager = roleManager;
    }
    public async Task Seed()
    {
        await SeedRoles();
        await SeedUsers();
    }
    public async Task SeedRoles()
    {
       
        var dbRoles = await _roleManager.Roles.ToListAsync();

        var roles = new List<IdentityRole>()
        {
            new() {Name = "Admin"},
            new() {Name = "Customer" },
        };

        foreach(var role in roles)
        {
            if (!dbRoles.Contains(role))
            {
                await _roleManager.CreateAsync(role);
            }
        }

        
    }
    public async Task SeedUsers()
    {
        var users = new List<(AppUser user, string role)>()
        {
            (new() { FirstName = "Ahmad", LastName = "Abdullah" ,UserName = "admin", Email= "admin@test.com", EmailConfirmed = true}, "Admin"),
            (new() {FirstName = "John",LastName = "Doe"  ,UserName = "customer", Email= "customer@test.com", EmailConfirmed = true}, "Customer"),
        };

        
        foreach (var (user,role) in users)
        {
            var existingUser = await _userManager.FindByNameAsync(user.UserName!);
         
            if (existingUser == null)
            {
                var result = await _userManager.CreateAsync(user,"Pa$$w0rd");       
               
                if(result.Succeeded)
                    await _userManager.AddToRoleAsync(user, role);
            }

        }

    }
}
