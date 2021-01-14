import { AuthGuardService } from './services/authGuard.service';
import { LogResponseInterceptor } from './services/logResponseInterceptor';
import { ContactFormService } from './services/contactForm.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { VehicleItemComponent } from './vehicle/vehicle-item/vehicle-item.component';
import { VehicleService } from './services/vehicle.service';
import { VehicleEditComponent } from './vehicle-edit/vehicle-edit.component';
import { AddPicturesComponent } from './add-pictures/add-pictures.component';
import { PhotoService } from './services/photo.service';
import { AdminVehicleListComponent } from './admin-vehicle-list/admin-vehicle-list.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { RegisteredUsersComponent } from './registered-users/registered-users.component';
import { RegisterComponent } from './register/register.component';
import { VehicleResolver } from './services/vehicleResolver.service';
import { HttpCacheService } from './services/http-cache.service';
import { CacheInterceptor } from './services/cache.interceptor';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { ContactusComponent } from './contactus/contactus.component';
import { KycUploadComponent } from './kyc-upload/kyc-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    AddPicturesComponent,
    AdminVehicleListComponent,
    CounterComponent,
    FetchDataComponent,
    HomeComponent,
    LoginComponent,
    NavMenuComponent,
    VehicleComponent,
    VehicleDetailsComponent,
    VehicleEditComponent,
    VehicleItemComponent,
    RegisterComponent,
    RegisteredUsersComponent,
    PaginationComponent,
    NavigationComponent,
    FooterComponent,
    ContactusComponent,
    KycUploadComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    ReactiveFormsModule,
    RouterModule.forRoot([
      // { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'vehicles', component: AdminVehicleListComponent, canActivate: [AuthGuardService] },
      { path: 'newVehicle', component: VehicleEditComponent, canActivate: [AuthGuardService]},
      { path: 'newVehicle/:id', component: VehicleEditComponent, canActivate: [AuthGuardService] },
      {path: 'vehicle/photo/:id', component: AddPicturesComponent, canActivate: [AuthGuardService]},
      {path: 'publicVehicles', component: VehicleComponent, resolve: {resolvedVehicles: VehicleResolver}},
      {path: 'vehicle/details/:id', component: VehicleDetailsComponent},
      {path: 'user/registeredUsers', component: RegisteredUsersComponent, canActivate: [AuthGuardService]},
      {path: 'user/login', component: LoginComponent},
      {path: 'user/register', component: RegisterComponent},
      {path: 'contactus', component: ContactusComponent},
      {path: '', component: KycUploadComponent}

    ])
  ],
  providers: [VehicleService, PhotoService, ContactFormService, AuthService, UserService, VehicleResolver,
    HttpCacheService, AuthGuardService,
  // {provide: HTTP_INTERCEPTORS, useClass: VehicleInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: LogResponseInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
