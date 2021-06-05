import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { CardetailComponent } from '../cardetail/cardetail.component';

@Component({
  selector: 'app-caradd',
  templateUrl: './caradd.component.html',
  styleUrls: ['./caradd.component.css']
})
export class CaraddComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,private brandService:BrandService,private carService:CarService,
    private toastrService:ToastrService, private colorService:ColorService) { }
    carAddForm:FormGroup ;
    car:Car
    brands: Brand[]=[];
    colors:Color[]=[]
  ngOnInit(): void {
    this.brandService.getBrands().subscribe(data=>{
      this.brands =data.data;
    });
    this.colorService.getColors().subscribe(data=>{
      this.colors=data.data
    })
    this.createCarAddForm();
  }

  createCarAddForm(){
    this.carAddForm = this.formBuilder.group({
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      carName:["",Validators.required],
      modelYear:["",Validators.required], 
      dailyPrice:["",Validators.required], 
      description:["",Validators.required], 
      thumbnail:["",Validators.required]
    });
   // burada isrented ı sildim unutma
  }

  carAdd(){
    
    
    let temp = Object.assign({}, this.carAddForm.value);
    let car:Car={brandId:Number(temp.brandId),
      colorId:Number(temp.colorId),
      carName:String(temp.carName),
      modelYear:Number(temp.modelYear),
      dailyPrice:Number(temp.dailyPrice),
      description:String(temp.description),
      isRented:false,
      thumbnail:String(temp.thumbnail)}
    console.log(car)
    
this.carService.addCar(car).subscribe(response=> {
  this.toastrService.success("Car adding successfull");
  window.location.reload()
},responseError=>{ this.toastrService.error("unf. car not added")
  console.log("responseerror "+responseError)})
  }
  
}
