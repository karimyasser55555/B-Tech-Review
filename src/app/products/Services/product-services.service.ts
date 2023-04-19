import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iproduct } from '../Models/iproduct';
@Injectable({
  providedIn: 'root'
})
export class ProductServicesService {

  constructor(private httpClient:HttpClient) { }
  GetProductByCatId(categoryId:number):Observable<Iproduct[]>{
    //return this.httpClient.get<Iproduct[]>(`http://localhost:3000/products?categoryId=${catid}`);
    return this.httpClient.get<Iproduct[]>(`http://ahmedrefaay-001-site1.ctempurl.com/API/api/Product/GetAllProduct?categoryId=${categoryId}`);
  }
  GetAllProducts():Observable<Iproduct[]>{
    return this.httpClient.get<Iproduct[]>("http://ahmedrefaay-001-site1.ctempurl.com/API/api/Product/GetAllProduct")

  }

  GetProductsDetailsByID(id:number):Observable<any>{
   // return this.httpClient.get<Iproduct>(`http://localhost:3000/products/${id}`);
   return this.httpClient.get<any>(`http://ahmedrefaay-001-site1.ctempurl.com/API/api/Product/GetProductyById/${id}`);
  }



  // getProductsByBrand(brand:string):Observable<Iproduct[]>{
  //   return this.httpClient.get<Iproduct[]>(`http://localhost:3000/products?brand=${brand}`);
  // }

  // GetProductByFilter(categoryId:number):Observable<Iproduct[]>{

  //   return this.httpClient.get<Iproduct[]>(`http://localhost:5000/api/Product/GetAllProduct?categoryId=${categoryId}&&name=${name}`);
  // }
}
