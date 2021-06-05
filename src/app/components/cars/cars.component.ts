import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDto } from 'src/app/models/cardto';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { CarimageService } from 'src/app/services/carimage.service';
import { ColorService } from 'src/app/services/color.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
})
export class CarsComponent implements OnInit {
  cars: CarDto[] = [];
  brands: Brand[] = [];
  currentCar: CarDto;
  filterText = '';
  openUpdateMenu = false;
  openAddMenu = false;

  carAddForm: FormGroup;
  colors: Color[] = [];
  carId:number;
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private brandService: BrandService,
    private toastrService: ToastrService,
    private rentalService: RentalService,
    private carimageService: CarimageService,
    private formBuilder: FormBuilder,
    private colorService: ColorService
  ) {}

  ngOnInit(): void {
    this.getCars();

    this.getBrands();
    this.getColors();
    this.createCarAddForm();
  }

  private getColors() {
    this.colorService.getColors().subscribe((data) => {
      this.colors = data.data;
    });
  }

  private getBrands() {
    this.brandService.getBrands().subscribe((data) => {
      this.brands = data.data;
    });
  }

  getCars() {
    this.carService.getAllCarDtos().subscribe((response) => {
      this.cars = response.data;
    });
  }

  setCurrentCar(car: CarDto) {
    this.currentCar = car;
  }

  delete(id: number) {
    this.rentalService.deleteByCarId(id).subscribe((response) => {
      if (response.success == true) {
        this.carimageService.deleteByCarId(id).subscribe((response) => {
          if (response.success == true) {
            this.carService.deleteByCarId(id).subscribe((response) => {
              if (response.success == true) {
                this.getCars();
                this.toastrService.success('Car deleted succesfuly');
                return;
              } else
                this.toastrService.error(
                  'car doesnt deleted, because of cars table'
                );
            });
          } else
            this.toastrService.error(
              'car doesnt deleted, because of carimage table'
            );
        });
      } else
        this.toastrService.error('car doesnt deleted, because of rental table');
    });
    
  }

  openUpdate(id:number) {
    this.openAddMenu = false;
    this.openUpdateMenu = true;
    this.carId=id;
    this.getCarCurrentValues(id);
  }
  openAdd() {
    this.openUpdateMenu = false;
    this.openAddMenu = true;
    this.getCars();
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      carName: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
      isRented: ['', Validators.required],
      thumbnail: ['', Validators.required],
    });
    // burada isrented ı sildim unutma
  }

  carUpdate() {
let statusRent= (this.carAddForm.controls['isRented'].value=="true")?true:false;
//alert("status rent"+statusRent)

    let temp = Object.assign({}, this.carAddForm.value);
    let car: Car = {
      carId:this.carId,
      brandId: Number(temp.brandId),
      colorId: Number(temp.colorId),
      carName: String(temp.carName),
      modelYear: Number(temp.modelYear),
      dailyPrice: Number(temp.dailyPrice),
      description: String(temp.description),
      isRented: statusRent,
      thumbnail: String(temp.thumbnail),
    };

    console.log(car);

    this.carService.updateCar(car).subscribe(
      (response) => {
        this.toastrService.success('Car updated successfully');
        this.getCars();
      },
      (responseError) => {
        this.toastrService.error("unfortunately car not updated. control the car values!"+responseError)
        console.log('responseerror ' + responseError);
      }
    );

    //alert(typeof(Boolean(this.carAddForm.controls['isRented'].value)))
    
  }

  getCarCurrentValues(id:number){
let tempCar:CarDto = this.cars.find(c=> c.carID==id)
this.carAddForm.controls['brandId'].setValue(tempCar.brandID)
this.carAddForm.controls['colorId'].setValue(tempCar.colorID)
this.carAddForm.controls['carName'].setValue(tempCar.carName)
this.carAddForm.controls['modelYear'].setValue(tempCar.modelYear)
this.carAddForm.controls['dailyPrice'].setValue(tempCar.dailyPrice)
this.carAddForm.controls['description'].setValue(tempCar.description)
this.carAddForm.controls['isRented'].setValue(tempCar.isRented)
this.carAddForm.controls['thumbnail'].setValue(tempCar.thumbnail)
  }

  reloadPage()
 {
  window.location.reload()
 }
}
