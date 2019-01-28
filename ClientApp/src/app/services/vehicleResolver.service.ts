import { QueryResult } from './../models/queryResult.model';
import { catchError } from 'rxjs/operators';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { VehicleService } from './vehicle.service';
import { of } from 'rxjs/observable/of';

@Injectable()
export class VehicleResolver implements Resolve<QueryResult> {
  private readonly _pageSize = 5;
  query: any = {
    pageSize: this._pageSize
  };
  constructor(private vehicleService: VehicleService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QueryResult> {
    return this.vehicleService.getVehicles(this.query)
    .pipe(
      catchError(err => of(err))
    );
  }
}
