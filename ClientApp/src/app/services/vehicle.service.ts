import { ErrorMessage } from './../models/errorHandler.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Vehicle } from '../models/vehicle.model';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class VehicleService {
  constructor (private httpClient: HttpClient) {
  }
  getVehicles (filter) {
    return this.httpClient.get('/api/skineroVehicles'  + '?' + this.toQueryString(filter))
    .pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }
  private toQueryString(obj) {
    const parts = [];
    for (const property in obj) {
      const value = obj[property];
      if (value != null && value !== undefined) {
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
      }
    }
    return parts.join('&');
  }
  createVehicle (vehicle: Vehicle) {
    return this.httpClient.post('/api/skineroVehicles', vehicle);
  }
  getVehicle (id: number) {
    return this.httpClient.get('/api/skineroVehicles/' + id)
    .pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }
  updatevehicle (id: number, vehicle: Vehicle) {
    return this.httpClient.put('/api/skineroVehicles/' + id, vehicle);
  }
  deleteVehicle (id: number): Observable<any> {
    return this.httpClient.delete<any>('/api/skineroVehicles/' + id);
  }
  private handleError(error: HttpErrorResponse) {
    const errorMessage: ErrorMessage = {message: ''};
    errorMessage.message = 'Unable to get';
    return ErrorObservable.create(errorMessage);
  }
}
