using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SkineroMotors.Controllers.Resources;
using SkineroMotors.Core;
using SkineroMotors.Core.Models;

namespace SkineroMotors.Controllers {
    [Route ("/api/skineroVehicles")]
    [ApiController]
    public class VehicleController : Controller {
        private IMapper _mapper { get; }
        private IVehicleRepository _repository { get; }
        private IUnitOfWork _unitOfWork { get; }
        public VehicleController (IMapper mapper, IVehicleRepository repository, IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            this._repository = repository;
            this._mapper = mapper;
        }
        [HttpPost]
        public async Task<IActionResult> CreateVehicle(VehicleResource vehicleResource) 
        {
            if (!ModelState.IsValid)
                return BadRequest (ModelState);
            var vehicle = _mapper.Map<VehicleResource, Vehicle>(vehicleResource);
            vehicle.LastUpdate = DateTime.Now;
            _repository.Add(vehicle);

            await _unitOfWork.CompleteAsync();
            vehicle = await _repository.GetVehicle(vehicle.Id);
            return Ok(vehicle);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVehicle(int id, SaveVehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
                return BadRequest (ModelState);
            var vehicle = await _repository.GetVehicle(id);
            if (vehicle == null)
                return NotFound("Not Found");
            
            _mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource, vehicle);
            vehicle.LastUpdate = DateTime.Now;
            await _unitOfWork.CompleteAsync();

            vehicle = await _repository.GetVehicle(vehicle.Id);
            var result = _mapper.Map<Vehicle, VehicleResource>(vehicle);

            return Ok(result);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle (int id)
        {
            var  vehicle = await _repository.GetVehicle(id);
            if (vehicle == null)
                return NotFound ("Not found");
            _repository.Remove(vehicle);
            await _unitOfWork.CompleteAsync();

            return Ok($"Vehicle with id {id} successfully removed");
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicle(int id)
        {
            var vehicle = await _repository.GetVehicle(id);
            if (vehicle == null)
                return NotFound("Vehicle Not found");
            var vehicleResource = _mapper.Map<Vehicle, VehicleResource>(vehicle);
            return Ok(vehicleResource);
        }
        [HttpGet]
        public async Task<IEnumerable<VehicleResource>> GetVehicles([FromQuery] VehicleResource vehicleResource)
        {
            var vehicle = _mapper.Map<VehicleResource, Vehicle>(vehicleResource);
            var result = await _repository.GetVehicles(vehicle);
            return  _mapper.Map<IEnumerable<Vehicle>, IEnumerable<VehicleResource>>(result);
        }
    }
}