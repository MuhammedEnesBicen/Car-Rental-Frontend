import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarComponent } from './components/car/car.component';

import { FilterBrandPipe } from './pipes/filter-brand.pipe';
import { HttpClientModule } from '@angular/common/http';
import { FilterCarPipe } from './pipes/filter-car.pipe';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarsComponent } from './components/cars/cars.component';
import { CaraddComponent } from './components/caradd/caradd.component';
import { CarandbrandadminpanelComponent } from './components/carandbrandadminpanel/carandbrandadminpanel.component';
import { RentalsAdminComponent } from './components/rentals-admin/rentals-admin.component';
import { RentalPipe } from './pipes/rental.pipe';
import { UpdateInfoComponent } from './components/update-info/update-info.component';
import { CustomerCartComponent } from './components/customer-cart/customer-cart.component';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
    CarComponent,
    FilterBrandPipe,
    FilterCarPipe,
    RegisterComponent,
    LoginComponent,
    CardetailComponent,
    CarUpdateComponent,
    CarsComponent,
    CaraddComponent,
    CarandbrandadminpanelComponent,
    RentalsAdminComponent,
    RentalPipe,
    UpdateInfoComponent,
    CustomerCartComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
