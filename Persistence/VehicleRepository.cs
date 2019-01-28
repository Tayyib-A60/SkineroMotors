using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SkineroMotors.Core;
using SkineroMotors.Core.Models;
using System.Linq;
using System.Linq.Expressions;
using System.Collections.ObjectModel;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System;
using SkineroMotors.Extensions;

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
        public async Task<QueryResult<Vehicle>> GetVehicles(VehicleQuery vehicleQueryObject)
        {
            var result = new QueryResult<Vehicle>();
            var query = _context.Vehicles
            .AsQueryable();
            var columnsMap = new Dictionary<string, Expression<Func<Vehicle, object>>>()
            {
                ["SellingPrice"] = v => v.SellingPrice
            };
            result.TotalItems = await query.CountAsync();
            query = query.ApplyOrdering(vehicleQueryObject, columnsMap);
            query = query.ApplyPaging(vehicleQueryObject);
            result.Vehicles =  await query.ToListAsync();
            return result;
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