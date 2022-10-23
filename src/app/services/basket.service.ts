import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BasketModel } from '../models/basket';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private httpClinet:HttpClient,@Inject("apiUrl") private apiUrl:string) { }

  getList(){
    let api = this.apiUrl + "baskets/getlist"
    return  this.httpClinet.get(api)
  }
  add(basketModel:BasketModel){
    let api = this.apiUrl + "baskets/add"
    return  this.httpClinet.post(api,basketModel)
  }
  delete(basketModel:BasketModel){
    let api = this.apiUrl + "baskets/delete"
    return  this.httpClinet.post(api,basketModel)
  }
  update(basketModel:BasketModel)
  {
    let api = this.apiUrl + "baskets/update"
    return  this.httpClinet.post(api,basketModel)
  }
}

