import { ErrorMessage } from './../models/errorHandler.model';
import { ActivatedRoute } from '@angular/router';
import { ContactFormService } from './../services/contactForm.service';
import { Vehicle } from './../models/vehicle.model';
import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../services/vehicle.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QueryResult } from '../models/queryResult.model';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  vehicles: Vehicle[] = [];
  contactForm: FormGroup;
  private readonly _pageSize = 5;
  queryResult: QueryResult = {
    totalItems: 0,
    vehicles: []
  };
  query: any = {
    pageSize: this._pageSize
  };

  constructor(private vehicleService: VehicleService, private route: ActivatedRoute, private contactService: ContactFormService) { }

  ngOnInit() {
    this.getVehicles();
    this.initializeContactForm();
  }
  private getVehicles() {
    const resolveData: QueryResult | ErrorMessage = this.route.snapshot.data['resolvedVehicles'];
    this.queryResult = resolveData as QueryResult;
    this.vehicles = this.queryResult.vehicles as Vehicle[];
    if (resolveData instanceof ErrorMessage) {
      console.log(resolveData.message);
    } else if (resolveData instanceof Vehicle) {
      console.log(resolveData);
      console.log(this.vehicles);
    }
    // this.vehicleService.getVehicles().subscribe(response => {
    //   this.vehicles = response as Vehicle;
    //   console.log(this.vehicles);
    // }, error => {
    //   console.log(error);
    // });
  }
  private getVehiclees() {
    this.vehicleService.getVehicles(this.query).subscribe(queryResult => {
      this.queryResult = queryResult;
      this.vehicles = this.queryResult.vehicles;
    });
  }
  onPageChange(page: number) {
    this.query.page = page;
    this.getVehiclees();
  }
  private initializeContactForm() {
    const name = '';
    const email = '';
    const phone = '';
    const message = '';
    this.contactForm =  new FormGroup({
      'name': new FormControl(name, Validators.required),
      'email': new FormControl(email, [Validators.required, Validators.email]),
      'phone': new FormControl(phone, [Validators.required]),
      'message': new FormControl(message)
    });
  }
  onSubmit() {
     this.contactService.createContactForm(this.contactForm.value).subscribe(res => {
       console.log(res);
     });
     this.initializeContactForm();
  }

}
