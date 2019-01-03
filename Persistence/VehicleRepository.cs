using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SkineroMotors.Core;
using SkineroMotors.Core.Models;
using System.Linq;
using System.Linq.Expressions;
using System.Collections.ObjectModel;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace SkineroMotors.Persistence
{
    [Route ("/api/vehicles")]
    [ApiController]
    public class VehicleRepository: IVehicleRepository
    {
        private SMDbContext _context { get; }
        public VehicleRepository(SMDbContext context)
        {
            _context = context;
        }
        public async Task<Vehicle> GetVehicle(int Id)
        {
            var result = _context.Vehicles
            // .Include(v => v.Photos)
            .SingleOrDefaultAsync(v => v.Id == Id);
            return await result;
        }
        public async Task<IEnumerable<Vehicle>> GetVehicles(Vehicle vehicle)
        {
            var result = _context.Vehicles
            // .Include(v => v.Photos)
            .ToListAsync();
            return await result;
        }
        public void Remove(Vehicle vehicle)
        {
            _context.Remove(vehicle);
        }
        public void Add(Vehicle vehicle)
        {
            _context.Add(vehicle);
        }
    }
}