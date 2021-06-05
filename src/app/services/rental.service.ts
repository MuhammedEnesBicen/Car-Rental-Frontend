import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDto } from '../models/rentaldto';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private httpClient: HttpClient) { }
  apiUrl = 'https://localhost:44391/api';

  getRentals():Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + "/rentals/getall";
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  // getRentalDtos():Observable<ListResponseModel<RentalDto>>
  // {
  //   let newPath = this.apiUrl + "/rentals/getrentaldetails";
  //   return this.httpClient.get<ListResponseModel<RentalDto>>(newPath);
  // }

  addRental(rental:Rental):Observable<ResponseModel>
  {
    let newPath = this.apiUrl + "/rentals/add";
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }

  deleteByCarId(carId:number){
    let newPath = this.apiUrl + "/rentals/deletebycarid?carId=" + carId;
  
    return this.httpClient.get<ResponseModel>(newPath);
  }
  delete(rental:Rental):Observable<ResponseModel>{
    let newPath = this.apiUrl + "/rentals/delete";
  
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }

  getRentalsDetails():Observable<ListResponseModel<RentalDto>>{
    let newPath = this.apiUrl + "/rentals/getrentaldetails";
    return this.httpClient.get<ListResponseModel<RentalDto>>(newPath);
  }
}
