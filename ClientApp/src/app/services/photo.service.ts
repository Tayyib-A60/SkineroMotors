import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PhotoService {
  constructor(private httpClient: HttpClient) {
  }
  header() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let httpOptions = {
      headers: new HttpHeaders({})
    };
    if (currentUser && currentUser.token) {
        httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization':  `Bearer ${currentUser.token}`
        })
      };
    }
    return httpOptions;
  }
  getPhotos(vehicleId: number) {
    return this.httpClient.get(`/api/skineroVehicles/photos/${vehicleId}`, this.header());
  }
  uploadPhoto(vehicleId, photo) {
    const formData = new FormData();
    const headers = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    formData.append('file', photo);
    const request = new HttpRequest('POST', `/api/skineroVehicles/photos/${vehicleId}`, formData, { reportProgress: true});
    return this.httpClient.request(request);
  }
  deletePhoto(id: number, vehicleId: number) {
    return this.httpClient.delete(`/api/skineroVehicles/photos/${vehicleId}/${id}`);
  }
}
