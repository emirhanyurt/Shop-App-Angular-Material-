import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ProductModel } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  isAdd:boolean = true;
  image:string = "";
  form:FormGroup;
  productModel:ProductModel;
  constructor(private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
   
    private productService:ProductService,
    private spinner:NgxSpinnerService,
    private toastr:ToastrService,
    private router:Router,
    ) { }

  ngOnInit(): void {
    this.createForm()
    this.activatedRoute.params.subscribe((res:any)=>{
      if (res.value != undefined) {
        this.getProduct(res.value)
        this.isAdd = false;
      }else{
        this.isAdd = true;
      }
    })
  }
  createForm(){
    this.form = this.formBuilder.group({
      id: [0,Validators.required],
      name: ["",Validators.required],
      inventoryQuantity: [0,[Validators.required, Validators.min(1)]],
      price: [0,[Validators.required, Validators.min(1)]],
      imageUrl: ["",Validators.required],
      codeGuid: ["guid",Validators.required],
    });
  }
  getProduct(guid:string){
    this.spinner.show();
    this.productService.getById(guid).subscribe((res:any)=>{
      this.spinner.hide();
      this.productModel = res.data
      this.form.controls["id"].setValue(this.productModel.id);
      this.form.controls["name"].setValue(this.productModel.name);
      this.form.controls["inventoryQuantity"].setValue(this.productModel.inventoryQuantity);
      this.form.controls["price"].setValue(this.productModel.price);
      this.form.controls["codeGuid"].setValue(this.productModel.codeGuid);
      this.image = this.productModel.imageUrl
    },(err)=>{
      this.spinner.hide();
      
    })
  }

  add(){
    if (this.form.valid) {
      this.spinner.show();
      this.productService.add(this.form.value).subscribe((res:any)=>{
        this.spinner.hide();
        this.form.reset();
        this.toastr
      },(err)=>{
        this.spinner.hide();
        
      })
    }else{
      this.spinner.hide();
      this.toastr.success("Gerekli Alanları Doldurun")
    }
  }

  update(){
    if (this.form.valid) {
      this.spinner.show();
      this.productService.update(this.form.value).subscribe((res:any)=>{
        this.spinner.hide();
        this.toastr.success(res.messege)
        this.router.navigate(["/"]);
      },(err)=>{
        this.spinner.hide();
        
      })
    }else{
      this.spinner.hide();
      this.toastr.success("Zorunlu alanları doldurun");
    }
  }
}
