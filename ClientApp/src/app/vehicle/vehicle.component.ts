import { ContactFormService } from './../services/contactForm.service';
import { Vehicle } from './../models/vehicle.model';
import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../services/vehicle.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  vehicles: Vehicle;
  contactForm: FormGroup;

  constructor(private vehicleService: VehicleService, private contactService: ContactFormService) { }

  ngOnInit() {
    this.getVehicles();
    this.initializeContactForm();
  }
  private getVehicles() {
    this.vehicleService.getVehicles().subscribe(response => {
      this.vehicles = response as Vehicle;
      console.log(this.vehicles);
    }, error => {
      console.log(error);
    });
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
     this.contactForm = new FormGroup({});
  }

}
