import { ContactForm } from './../models/contactForm.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ContactFormService {
  constructor(private httpClient: HttpClient) {
  }
  createContactForm(contact: ContactForm) {
    return this.httpClient.post('/api/skineroVehicles/contactUs', contact);
  }
  getAllContacts() {
    return this.httpClient.get('/api/skineroVehicles/contactUs').toPromise();
  }
}
