import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carimage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarimageService {

  apiUrl = 'https://localhost:44391/api/';

  constructor(private httpClient:HttpClient) { }

  getCarImages(carId:number):Observable<ListResponseModel<CarImage>> {

    let newPath = this.apiUrl + "images/getbycarid?carId=" + carId;
  
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  deleteByCarId(carId:number){
    let newPath = this.apiUrl + "images/deletebycarid?carId=" + carId;
  
    return this.httpClient.get<ResponseModel>(newPath);
  }
}
