import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RentalDto } from 'src/app/models/rentaldto';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rentals-admin',
  templateUrl: './rentals-admin.component.html',
  styleUrls: ['./rentals-admin.component.css']
})
export class RentalsAdminComponent implements OnInit {

  constructor(private rentalService:RentalService, private toastrService:ToastrService) { }
rentals :RentalDto[]=[]
filterText=""
  ngOnInit(): void {
    this.getRentalDtos();
  }

  getRentalDtos(){
this.rentalService.getRentalsDetails().subscribe(response=> {
  this.rentals=response.data
  console.log(response.data)
})
  }

  delete(id:number){
this.rentalService.deleteByCarId(id).subscribe(response=> {
  this.toastrService.success("rental deleted successfuly")
  console.log(response)
})
  }
}
