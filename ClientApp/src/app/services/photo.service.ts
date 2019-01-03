import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Injectable()
export class PhotoService {
  constructor(private httpClient: HttpClient) {
  }
  getPhotos(vehicleId: number) {
    return this.httpClient.get(`/api/skineroVehicles/${vehicleId}/photos`);
  }
  uploadPhoto(vehicleId, photo) {
    const formData = new FormData();
    formData.append('file', photo);
    const request = new HttpRequest('POST', `/api/skineroVehicles/${vehicleId}/photos`, formData, { reportProgress: true });
    return this.httpClient.request(request);
  }
  deletePhoto(id: number, vehicleId: number) {
    return this.httpClient.delete(`/api/skineroVehicles/${vehicleId}/photos/${id}`);
  }
}
