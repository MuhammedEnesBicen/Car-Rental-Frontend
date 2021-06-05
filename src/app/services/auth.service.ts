import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://localhost:44391/api/';
  
  constructor(
    private httpClient: HttpClient,

  ) {}

  getUsers():Observable<ListResponseModel<User>> {
    let newPath = this.apiUrl + "users/getall";
    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }
 
  addUser(user:User):Observable<ResponseModel>{
    let newPath = this.apiUrl + "users/add";
    return this.httpClient.post<ResponseModel>(newPath,user);
  }

  updateUser(user:User):Observable<ResponseModel>{
    let newPath = this.apiUrl + "users/update";
    return this.httpClient.post<ResponseModel>(newPath,user);
  }

  isAuthenticated() {
    if (localStorage.getItem('login')=="true") {
      return true;
    } else {
      return false;
    }
  }

  isAdmin(){
    if(localStorage.getItem('isAdmin') == "true")
    {
      return true;
    }
    else{
      return false;
    }
  }
  
}
