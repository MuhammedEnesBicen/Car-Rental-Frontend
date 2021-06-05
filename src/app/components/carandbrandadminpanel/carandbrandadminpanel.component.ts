import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-carandbrandadminpanel',
  templateUrl: './carandbrandadminpanel.component.html',
  styleUrls: ['./carandbrandadminpanel.component.css']
})
export class CarandbrandadminpanelComponent implements OnInit {

  constructor(private brandService:BrandService, private colorService:ColorService,
    private formBuilder:FormBuilder, private toastrService:ToastrService) { }
  brands: Brand[] = [];
  colors: Color[] = [];

  openBrandAddMenu=false
  openBrandUpdateMenu=false
  openColorAddMenu=false
  openColorUpdateMenu=false

  brandAddForm:FormGroup
  brandUpdateForm:FormGroup
  colorAddForm:FormGroup
  colorUpdateForm:FormGroup
  ngOnInit(): void {
    this.getBrands();
    this.getColors();

    this.createBrandAddForm();
    this.createBrandUpdateForm();
    this.createColorAddForm();
    this.createColorUpdateForm();

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

  createBrandAddForm(){
    this.brandAddForm = this.formBuilder.group({
      brandName:["",Validators.required]
    })
  }

createBrandUpdateForm(){
  this.brandUpdateForm = this.formBuilder.group({
    brandId: ["", Validators.required],
    brandName:["",Validators.required]
  })
}

  createColorAddForm(){this.colorAddForm = this.formBuilder.group({
    colorName:["",Validators.required]
  })}
  createColorUpdateForm(){this.colorUpdateForm = this.formBuilder.group({
    colorId:["",Validators.required],
    colorName:["",Validators.required]
  })}

  brandAdd(){
    let temp ={brandName:String(this.brandAddForm.controls["brandName"].value)}
    this.brandService.addBrand(temp).subscribe(response=>{
      this.toastrService.success("Brand added successfuly");
this.getBrands();
    },responseError=>{this.toastrService.error("unfortunately Brand not added."); console.log("brand not added: response: "+responseError)})}

  brandUpdate(){
    let temp={brandId:Number(this.brandUpdateForm.controls["brandId"].value),
  brandName:String(this.brandUpdateForm.controls["brandName"].value)}
    this.brandService.updateBrand(temp).subscribe(response=>{
      this.toastrService.success("Brand updated successfuly");
      this.getBrands();
    },responseError=>{this.toastrService.error("unfortunately Brand not updated."); console.log("brand not added: response: "+responseError)})
  }
  colorAdd(){ let temp ={colorName:String(this.colorAddForm.controls["colorName"].value)}
  this.colorService.addColor(temp).subscribe(response=>{
    this.toastrService.success("Color added successfuly");
this.getColors();
  },responseError=>{this.toastrService.error("unfortunately Color not added."); console.log("color not added: response: "+responseError)})}

  colorUpdate(){let temp ={colorId:Number(this.colorUpdateForm.controls["colorId"].value),
  colorName:String(this.colorUpdateForm.controls["colorName"].value)}
  this.colorService.updateColor(temp).subscribe(response=>{
    this.toastrService.success("Color updated successfuly");
    this.getColors();
  },responseError=>{this.toastrService.error("unfortunately Color not updated."); console.log("color not updated: response: "+responseError)})}


  openBrandAddMenuFunc(){
    this.openBrandAddMenu=true
    this.openBrandUpdateMenu=false
  }
  openBrandUpdateMenuFunc(){this.openBrandUpdateMenu=true
    this.openBrandAddMenu=false}
  openColorAddMenuFunc(){this.openColorAddMenu=true
    this.openColorUpdateMenu=false}
  openColorUpdateMenuFunc(){this.openColorAddMenu=false
    this.openColorUpdateMenu=true}
}
