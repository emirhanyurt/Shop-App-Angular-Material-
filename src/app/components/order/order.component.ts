import { Component, OnInit } from '@angular/core';
import { OrderModelDto } from 'src/app/models/OrderDto';
import { OrderService } from 'src/app/services/order.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orders:OrderModelDto[] = []
  constructor(private orderService:OrderService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.getList()
  }
  getList()
  {
    this.spinner.show()
    this.orderService.getList().subscribe((res:any)=>{
      this.orders = res.data
      this.spinner.hide()
    },(err)=>{
      console.log(err)
      this.spinner.hide()
    })
  }
}
