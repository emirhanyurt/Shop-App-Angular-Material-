import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { inject } from '@angular/core/testing';
import { ProductModel } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(private httpClient:HttpClient,@Inject("apiUrl") private apiUrl:string) { }

  add(productModel:ProductModel){
    let api = this.apiUrl + "products/add";
    return this.httpClient.post(api,productModel);
  }

  update(productModel:ProductModel){
    let api = this.apiUrl + "products/update";
    return this.httpClient.post(api,productModel);
  }

  getById(guid:string){
    let api = this.apiUrl + "products/getById?guid=" + guid;
    return this.httpClient.get(api);
  }

  getList()
  {
    let api = this.apiUrl + "products/getlist"
    return this.httpClient.get(api)
  }
}
