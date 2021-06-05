import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.css'],
})
export class UpdateInfoComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';

  oldEmail = '';
  userId:number;
  users: User[] = [];
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
    } else if (
      this.users.find(
        (user) => user.email == this.email && this.email != this.oldEmail
      )
    ) {
      this.toastrService.info('There is someone with this e-mail address');
    } else {
      let obje3: User = {
        id:this.userId,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        passwordSalt: this.password,
        passwordHash: this.password,
        status: false,
      };
      this.authService.updateUser(obje3).subscribe((response) => {
        this.toastrService.success(response.message);
        localStorage.setItem('userName',this.firstName);
      },responseError=>{this.toastrService.error("Something went wrong! this site cant update password for now.")});
    }
  }

  fillAreas() {
    let tempUID = Number(localStorage.getItem('userId'));
    
    let user: User = this.users.find((u) => u.id == tempUID);
    
    this.userId=tempUID;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.oldEmail = user.email;
    this.password = user.passwordHash;
    
  }

  getUsers() {
    this.authService.getUsers().subscribe((response) => {
      this.users = response.data;
      this.fillAreas()
    });
  }
}
