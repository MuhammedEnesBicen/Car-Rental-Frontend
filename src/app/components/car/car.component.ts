import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/car';
import { Brand } from 'src/app/models/brand';
import { CarDto } from 'src/app/models/cardto';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
  
})
export class CarComponent implements OnInit {

  constructor(private carService: CarService,private brandService: BrandService,) { }
  filterText = '';
cars:Car[] =[]
carDtos: CarDto[] = [];
carDtosCopy: CarDto[] = [];
brands: Brand[] = [];
filterMinText=0
filterMaxText=0
filterSort=""
brandId=0


/**{carID:2,carName:"Volvo", brandName:"S90",colorName:"Red",modelYear:2020,dailyPrice:12, minFindeks:12, isRented:false} */
  ngOnInit(): void {
    this.getAllCarDtos();
    this.getBrands();
  }


  getAllCarDtos() {
    this.carService.getAllCarDtos().subscribe((response) => {
      this.carDtos = response.data;
      this.carDtosCopy =response.data;
      
    });
  }

  getBrands() {
    
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  

  getCars() {
    this.carService.getCars().subscribe((response) => {
      //alert(JSON.stringify(response))
      this.cars = response.data;
    });
  }


  getSelectedBrandId(brandId: number) {
    if(this.brandId == brandId)
    {
      return true;
    }
    else
    {
      return false;
    }
  }


  getFilteredCars(min: number, max: number) {
    this.carDtos=[]
    this.carDtosCopy.forEach(value=> this.carDtos.push(Object.assign({},value)));
    
   this.carDtos= this.carDtos.filter(carDto=>this.filterCars1(carDto,min));
   this.carDtos= this.carDtos.filter(carDto=>this.filterCars2(carDto,max));
   this.carDtos= this.carDtos.filter(carDto=>this.filterCars3(carDto));

   if(this.filterSort=="asc")//artan
   this.carDtos= this.carDtos.sort((a,b)=>a.dailyPrice<b.dailyPrice?-1:a.dailyPrice>b.dailyPrice?1:0);
   
   if(this.filterSort=="dsc")
   this.carDtos= this.carDtos.sort((a,b)=>a.dailyPrice>b.dailyPrice?-1:a.dailyPrice<b.dailyPrice?1:0);
//alert(this.filterSort)
  
  }

  filterCars1(carDto:CarDto,min: number) {
    
    return (carDto.dailyPrice>min )?true:false;
  }
  filterCars2(carDto:CarDto,max: number) {
    if(max>0 )
    return (carDto.dailyPrice<max )?true:false;
    else return true
  }
  filterCars3(carDto:CarDto) {
    if(this.brandId!=0 )
    return (carDto.brandID==this.brandId )?true:false;
    else return true
  }
  


  clearFilters(){
    
    this.filterMinText=0; this.filterMaxText=0;
    this.carDtos=[]
    this.carDtosCopy.forEach(value=> this.carDtos.push(Object.assign({},value)));
    
  }
}
