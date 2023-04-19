import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPayment } from '../Models/ipayment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private httpOptions = {};
constructor(private httpClient: HttpClient) {
  this.httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }}

  // Add(Payment:IPayment):Observable<number>{
  //   return this.httpClient.post<number>(` http://localhost:3000/Payment/Add`,JSON.stringify(Payment), this.httpOptions)
  // }
}
