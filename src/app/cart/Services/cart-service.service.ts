import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  constructor(private httpClient :HttpClient) {

  }
  CreateNewCart(model:any){
   // return this.httpClient.post()
  }
}
