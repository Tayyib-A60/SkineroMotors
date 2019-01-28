import { Observable } from 'rxjs/Observable';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class VehicleInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`VehicleInterceptorService ${req.url}`);
    let jsonreq: HttpRequest<any> = req.clone({});
    if (req.url.startsWith('/api/skineroVehicles/photos/')) {
      jsonreq = req.clone({
        setHeaders: {'Content-Type': 'multipart/form-data'}
      });
    } else {
      jsonreq = req.clone({
        setHeaders: {'Content-Type': 'application/json'}
      });
    }
    return next.handle(jsonreq);
  }
}
