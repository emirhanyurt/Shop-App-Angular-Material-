import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { BasketModel } from 'src/app/models/basket';
import { ProductModel } from 'src/app/models/product';
import { BasketService } from 'src/app/services/basket.service';
import { ProductService } from 'src/app/services/product.service';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BasketPaymentModelDto } from 'src/app/models/BasketPaymentModuleDTO';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,AfterContentChecked {
  productName:string
  total:number = 0
  productModel:ProductModel[]  = []
  basketModel:BasketModel[] = []
  displayedColumns: string[] = ['id', 'name', 'quantity', 'total','transaction'];
  isAuth:boolean = false
  constructor(private authservice:AuthService,private orderService:OrderService,public dialog: MatDialog,private spinner:NgxSpinnerService,private toastr:ToastrService,private productService:ProductService,private basketService:BasketService) { }
  animal: string;
  name: string;
  ngOnInit(): void {
    this.getListProduct()
    this.getListBasket()
    
  }
  ngAfterContentChecked(): void {
    this.isAuth = this.authservice.isAuthenticated();
   }
  getListProduct()
  {
    this.spinner.show()
    this.productService.getList().subscribe((res:any)=>{
      this.spinner.hide()
      this.productModel = res.data
    },(err)=>{
      this.spinner.hide()
      this.toastr.error(err)
    })
  }
  getListBasket()
  {
    this.spinner.show()
    this.basketService.getList().subscribe((res:any)=>{
      this.basketModel = res.data
      this.total = 0
      res.data.forEach(element => {
        this.total = this.total + (element.product.price * element.quantity)
      });
      
    },(err)=>{
      this.spinner.hide()
      this.toastr.error(err)
    })
  }
  openDialog(basketModel:BasketModel): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: basketModel,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined)
      {
          this.deleteBasket(result)
      }
      
    });
  }
  openDialogPayment(): void {
    const dialogRef = this.dialog.open(paymentDialog, {
       width: '400px',
       data: this.basketModel,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined)
      {
        if(result.isvalid)
        {
          let paymentM = new BasketPaymentModelDto()
          paymentM.payment = result.value
          paymentM.baskets = this.basketModel
          this.spinner.show()
          this.orderService.add(paymentM).subscribe((res)=>{
            
            this.getListBasket()
            this.spinner.hide()
            this.toastr.success("Sipari??imiz Al??nm????t??r")
          },(err)=>{
            this.spinner.hide()
            console.log(err)
            this.toastr.error("Bir Hata Olu??tu")
           })
        }
        else{
          this.toastr.error("L??tfen T??m Alanlar?? Doldurunuz")
          
        }
          
      }
      
    });
  }
  updateBasket(basket:BasketModel,quantity:number){
    if(basket.quantity + quantity < 1){
      this.deleteBasket(basket)
      return
    }
    if(basket.product.inventoryQuantity - quantity < 0){
      this.toastr.error("Sepete Ekelenecek ??r??n Adedi,??r??n??n Stok Adedinden Fazla Olamaz","Bilgi:Ekleme Ba??ar??s??z")
      return
    }
    basket.quantity = basket.quantity+quantity
    this.spinner.show()
    this.basketService.update(basket).subscribe((res)=>{
      this.spinner.hide()
      this.toastr.info("??r??n Sepetden ????kar??ld??")
      this.getListBasket()
      this.getListProduct()
     },(err)=>{
      console.log(err)
      this.toastr.error("Bir Hata Olu??tu")
     })
  }
  deleteBasket(basket:BasketModel)
  {
       this.spinner.show()
       this.basketService.delete(basket).subscribe((res)=>{
        this.spinner.hide()
        this.toastr.info("Sepet G??ncellendi")
        this.getListBasket()
        this.getListProduct()
       },(err)=>{
        console.log(err)
        this.toastr.error("Bir Hata Olu??tu")
       })
  }
  add(productModels:ProductModel, addQuan:any){

    if(+addQuan.value < 0)
    {
      this.toastr.error("negatif de??er sepete eklenemez")
      return
    }

    if(productModels.inventoryQuantity < +addQuan.value)
    {
      this.toastr.error("Stokda yeterli ??r??n yok")
      return
    }
    
    this.spinner.show()
    let basketModels = new BasketModel()
    basketModels.product = productModels
    basketModels.productId = productModels.id
    basketModels.quantity = addQuan.value
   
     this.basketService.add(basketModels).subscribe((res)=>{
      this.getListBasket()
      this.getListProduct()
      this.toastr.success(basketModels.product.name + " Sepete Eklendi")
     },(err)=>{
      this.spinner.hide()
      this.toastr.error(err)
    })
  }

}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'delete-dialog.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'payment-dialog.html',
  styleUrls: ['./home.component.scss']
})
export class paymentDialog {
  constructor(
    public dialogRef: MatDialogRef<paymentDialog >,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}