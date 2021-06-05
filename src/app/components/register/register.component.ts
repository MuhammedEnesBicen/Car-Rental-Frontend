import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private router:Router,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';

  users:User[]=[]
  ngOnInit(): void {
    this.getUsers();
  }

  register() {
    if (
      this.email == '' ||
      this.password == '' ||
      this.firstName == '' ||
      this.lastName == ''
    ) {
      this.toastrService.error('Please dont pass the any area');
    }
    else if(this.users.find(user=>(user.email==this.email))){
      this.toastrService.info("There is someone with this e-mail address");
    }else{




let obje3:User =   {
  
firstName: this.firstName,
lastName: this.lastName,
email: this.email,
passwordSalt: this.password,
passwordHash: this.password,
status:false
}
      this.authService.addUser(obje3).subscribe(response=>{this.toastrService.success(response.message)
        this.router.navigate(['login'])});

      
      
    }
  }

  getUsers(){
    this.authService.getUsers().subscribe(response=>{
      this.users=response.data;
    })
      }
}
