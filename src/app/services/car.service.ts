import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDto } from '../models/cardto';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = 'https://localhost:44391/api/';

  constructor(private httpClient: HttpClient) {}

  getCars():Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getall";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  addCar(car:Car):Observable<ResponseModel> {
    let newPath = this.apiUrl + "cars/add";
    return this.httpClient.post<ResponseModel>(newPath, car);
  }
  
  updateCar(car:Car):Observable<ResponseModel> {
    let newPath = this.apiUrl + "cars/update";
    return this.httpClient.post<ResponseModel>(newPath, car);
  }

  getAllCarDtos():Observable<ListResponseModel<CarDto>>
  {
    let newPath = this.apiUrl + "cars/getcardetails";
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }

  getCarById(carId:number):Observable<any>
  {
    let newPath = this.apiUrl + "cars/getbyid?id=" + carId;
    return this.httpClient.get<any>(newPath);
  }

  getCarsByBrandId(brandId:number):Observable<ListResponseModel<CarDto>>
  {
    let newPath = this.apiUrl + "cars/getbybrandid?brandId=" + brandId;
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }


  getFilteredCars(minPrice:number, maxPrice:number)
  {
    let newPath = this.apiUrl + "cars/getbyunitprice?brandId=" + minPrice + "&colorId=" + maxPrice;
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);

    
  }
  // getFilteredCars(brandId:number, colorId:number)
  // {
  //   let newPath = this.apiUrl + "cars/getallcardetailsbyfilter?brandId=" + brandId + "&colorId=" + colorId;
  //   return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  // }

  delete(car:Car){
    let newPath = this.apiUrl + "cars/delete";
    return this.httpClient.post<ResponseModel>(newPath, car);
  }

  deleteByCarId(carId:number){
    let newPath = this.apiUrl + "cars/deletebycarid?carId="+carId;
    return this.httpClient.get<ResponseModel>(newPath);
  }
}
  