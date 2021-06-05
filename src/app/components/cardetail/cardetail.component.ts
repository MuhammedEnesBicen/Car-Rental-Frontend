import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDto } from 'src/app/models/cardto';
import { CarImage } from 'src/app/models/carimage';
import { Rental } from 'src/app/models/rental';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import { CarimageService } from 'src/app/services/carimage.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css']
})
export class CardetailComponent implements OnInit {

  constructor( private carService: CarService,
    private carImageService: CarimageService,
    private activetedRoute: ActivatedRoute,
    private authService:AuthService,
    private rentalService:RentalService,
    
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,) { }
  carDtos: CarDto;
  carImages: CarImage[] = [];
  path = 'https://localhost:44308/Images/';
  isRented: boolean;
  claim: string;
  isCustomer:boolean;

  carId:number
  rentalAddForm: FormGroup;
  
  ngOnInit(): void {
    this.activetedRoute.params.subscribe((params) => {
      if (params['carId']) {
        
        this.carId=params["carId"]
        this.getCarDtos(params['carId']);
        this.getCarImages(params['carId']);
        
      }
      this.isAdmin();
      this.checkIfCustomer();
      
    });
    this.checkIfCustomer();
    this.createRentalAddForm();
  }
  
  checkIfCustomer()
  {
    
    this.isCustomer=this.authService.isAuthenticated();
  }


  getCarDtos(id: number) {
    this.carService.getAllCarDtos().subscribe((response) => {
      let carDto:CarDto[] = response.data;

      
      this.carDtos = carDto.find(car=>(car.carID==id));
      this.isRented=this.carDtos.isRented;
      
    });
  }

  getCarImages(id: number) {
    this.carImageService.getCarImages(id).subscribe((response) => {
      this.carImages = response.data;
      
    });
  }

  isAdmin() {
    this.claim = localStorage.getItem('isAdmin'); 
  }

  rentThisCar(){
    if(this.rentalAddForm.valid){
      
if(this.carDtos.isRented==false){
  let rentObject:Rental ={carId:Number(this.carId),customerId:Number(localStorage.getItem("userId")),rentDate:this.rentalAddForm.controls["rentDate"].value,
returnDate:this.rentalAddForm.controls["returnDate"].value,
};
console.log(rentObject)
this.rentalService.addRental(rentObject).subscribe(response =>(this.toastrService.success("rental added")));

}else this.toastrService.error("this car is rented!")
    }
    else{
      this.toastrService.warning("please pick a date")
    }
  }

  createRentalAddForm() {
    this.rentalAddForm = this.formBuilder.group({
      rentDate: ['', Validators.required],
      returnDate: ['',Validators.required],
    });
  }
}
