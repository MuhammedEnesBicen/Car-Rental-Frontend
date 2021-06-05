import { Component, OnInit } from '@angular/core';
import { RentalService } from 'src/app/services/rental.service';
import { ToastrService } from 'ngx-toastr';
import { RentalDto } from 'src/app/models/rentaldto';


@Component({
  selector: 'app-customer-cart',
  templateUrl: './customer-cart.component.html',
  styleUrls: ['./customer-cart.component.css']
})
export class CustomerCartComponent implements OnInit {

  constructor(private rentalService:RentalService, private toastrService:ToastrService) { }
  rentals :RentalDto[]=[]
  filterText=""
  ngOnInit(): void {this.getRentalDtos();
  }

  getRentalDtos(){
    let userId=Number(localStorage.getItem('userId'));
    this.rentalService.getRentalsDetails().subscribe(response=> {
      this.rentals=response.data
      this.rentals= this.rentals.filter(a=>a.customerId==userId)
      console.log(response.data)
    })
      }
    
      delete(id:number){
    this.rentalService.deleteByCarId(id).subscribe(response=> {
      this.toastrService.success("rental deleted successfuly")
      this.getRentalDtos()
      console.log(response)
    })
      }
}
