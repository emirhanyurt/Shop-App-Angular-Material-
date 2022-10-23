
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BasketPaymentModelDto } from '../models/BasketPaymentModuleDTO';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClinet:HttpClient,@Inject("apiUrl") private apiUrl:string) { }
  add(basketPaymetDto:BasketPaymentModelDto){
    let api = this.apiUrl + "Orders/addPayment"
    return  this.httpClinet.post(api,basketPaymetDto)
  }
  getList()
  {
    let api = this.apiUrl + "Orders/getList"
    return this.httpClinet.get(api)
  }
}
