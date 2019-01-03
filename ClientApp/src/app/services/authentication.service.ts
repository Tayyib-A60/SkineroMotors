import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { ErrorMessage } from '../models/errorHandler.model';

@Injectable()
export class AuthService {
  constructor(private httpClient: HttpClient) {}
  login(email: string, password: string) {
    return this.httpClient.post('/api/skineroVehicles/user/authenticate', {email: email, password: password})
    .pipe(
      catchError((err: HttpErrorResponse) => this.handleHttpError(err))
    );
  }
  private handleHttpError(error: HttpErrorResponse) {
    const errorMessage: ErrorMessage = {message: ''};
    errorMessage.message = 'Unable to get';
    return ErrorObservable.create(errorMessage);
  }
  logout() {
    localStorage.removeItem('currentUser');
  }
}
