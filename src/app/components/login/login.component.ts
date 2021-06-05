import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
    
  ) {}
  email: string = '';
  password: string = '';
  users: User[] = [];

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this.authService.getUsers().subscribe((response) => {
      this.users = response.data;
    });
  }

  login() {
    if (this.email == '' || this.password == '') {
      this.toastrService.error('Please enter the email and password');
    } else if (
      this.users.find(
        (user) => user.email == this.email && user.passwordHash == this.password
      )
    ) {
      localStorage.setItem('login', 'true');
      let userTemp = this.users.find(
        (user) => user.email == this.email && user.passwordHash == this.password
      );
      localStorage.setItem('userName', userTemp.firstName);
      localStorage.setItem('userId', userTemp.id.toString());
      this.toastrService.success('Login succeded');
      if (userTemp.status == true) {
        localStorage.setItem('isAdmin', 'true');
      } else {
        localStorage.setItem('isAdmin', 'false');
      }
      
      this.router.navigate(['cars']);
      
    }else{
      this.toastrService.error("email or password is not valid!")
    }
    
  }
}
