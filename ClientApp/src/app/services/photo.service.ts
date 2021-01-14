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

  uploadKycDocs(data, document1, video) {
    const formData = new FormData();
    const headers = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    // var inputs = `[{"inputType":"document-photo","group":0,"data":{"type":"passport","country":"NG","region":"","page":"front","filename":"ID_FRONT_SIDE.jpg"}}]`;

    var inputs = `[{"inputType":"document-photo","group":0,"data":{"type":"national-id","country":"NG","region":"","page":"front","filename":"ID_FRONT_SIDE.jpg"}},{"inputType":"selfie-video","data":{"filename":"Liveness_video.mp4"}}]`;

    console.log(inputs);

    formData.append('document', document1);
    formData.append('video', video);
    formData.append('inputs', inputs);
    formData.append('AccountId', data['AccountId']);
    // formData.append('phoneNumber', data['phoneNumber']);
    formData.append('documentType', data['documentType']);
    const request = new HttpRequest('POST', `https://localhost:5004/api/kyc/upload_documents`, formData, { reportProgress: true});
    return this.httpClient.request(request);
  }

  deletePhoto(id: number, vehicleId: number) {
    return this.httpClient.delete(`/api/skineroVehicles/photos/${vehicleId}/${id}`);
  }
}
