import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { CarsComponent } from './components/cars/cars.component';
import { CustomerCartComponent } from './components/customer-cart/customer-cart.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalsAdminComponent } from './components/rentals-admin/rentals-admin.component';
import { UpdateInfoComponent } from './components/update-info/update-info.component';

const routes: Routes = [
  {path:'',pathMatch:'full', component:HeaderComponent},
  {path:'cars', component:HeaderComponent},
  {path:'carsadmin', component:CarsComponent},
  {path:'cardetails/:carId', component:CardetailComponent},
  {path:'rentals',component:RentalsAdminComponent},
  {path:'userrentals',component:CustomerCartComponent},
  {path:"login", component: LoginComponent},
  {path:"register", component: RegisterComponent},
  {path:"updateinfo", component:UpdateInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
