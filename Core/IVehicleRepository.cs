using System.Collections.Generic;
using System.Threading.Tasks;
using SkineroMotors.Core.Models;

namespace SkineroMotors.Core
{
    public interface IVehicleRepository
    {
          Task<Vehicle> GetVehicle(int id);
          void Remove(Vehicle vehicle);
          void Add(Vehicle vehicle);
          Task<IEnumerable<Vehicle>> GetVehicles(Vehicle vehicle);
    }
}