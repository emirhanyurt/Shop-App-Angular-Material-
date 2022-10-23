import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { inject } from '@angular/core/testing';
import { ProductModel } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(private httpClient:HttpClient,@Inject("apiUrl") private apiUrl:string) { }

  getList()
  {
    let api = this.apiUrl + "products/getlist"
    return this.httpClient.get(api)
  }
}
