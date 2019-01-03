import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UserService {
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
  getAll() {
    return this.httpClient.get('/api/skineroVehicles/user', this.header()).toPromise();
  }
  getUser(id: number) {
    return this.httpClient.get('/api/skineroVehicles/user' + id, this.header()).toPromise();
  }
  create(user: User) {
    return this.httpClient.post('/api/skineroVehicles/user/register', user, this.header());
  }
  update(user: User) {
    return this.httpClient.put('/api/skineroVehicles/user', user, this.header());
  }
  delete(id: number) {
    return this.httpClient.delete('/api/skineroVehicles/user/' + id, this.header());
  }
}
