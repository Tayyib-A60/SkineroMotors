import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../services/vehicle.service';
import { Vehicle } from '../models/vehicle.model';

@Component({
  selector: 'app-admin-vehicle-list',
  templateUrl: './admin-vehicle-list.component.html',
  styleUrls: ['./admin-vehicle-list.component.css']
})
export class AdminVehicleListComponent implements OnInit {
  vehicles: Vehicle[];
  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getVehicles().subscribe(vehicles => {
      this.vehicles = vehicles as Vehicle[];
    });
  }

}
