import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router:Router, private toastrService:ToastrService) { }
  
  userName:string=""
  userMail:string="";
  isAdmin:boolean=false;
  isUser:boolean=false;
  ngOnInit(): void {
    this.isAdminFunc();
  }

  
  isAuthenticated(){
    this.userName=localStorage.getItem('userName');
if(localStorage.getItem('login')=="true"){
  return true;
}return false;
  }
 
  logOut(){
    localStorage.removeItem('login');
    localStorage.removeItem('isAdmin');
this.toastrService.success("LogOut succesfull")
this.isAdminFunc()
    this.router.navigate(['cars'])
    
  }

  isAdminFunc(){
    if(localStorage.getItem('isAdmin')=='true'){this.isAdmin=true ; this.isUser=false}
    else{this.isAdmin=false; this.isUser=this.isAuthenticated()}
  }
}
