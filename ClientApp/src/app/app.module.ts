import { ContactFormService } from './services/contactForm.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap';

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
    RegisteredUsersComponent
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
    CarouselModule.forRoot(),
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'vehicles', component: AdminVehicleListComponent },
      { path: 'newVehicle', component: VehicleEditComponent },
      { path: 'newVehicle/:id', component: VehicleEditComponent },
      {path: 'vehicle/photo/:id', component: AddPicturesComponent},
      {path: 'publicVehicles', component: VehicleComponent},
      {path: 'vehicle/details/:id', component: VehicleDetailsComponent},
      {path: 'user/registeredUsers', component: RegisteredUsersComponent},
      {path: 'user/login', component: LoginComponent},
      {path: 'user/register', component: RegisterComponent}
    ])
  ],
  providers: [VehicleService, PhotoService, ContactFormService, AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
