import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrder } from '../Models/iorder';
import { Observable } from 'rxjs';
import { IOrderCreate } from '../Models/iorder-create';
import { OrderItems } from '../Models/order-items';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  httpHeader = {};
  constructor(private httpclient: HttpClient) {
    this.httpHeader = {
      headers: new HttpHeaders({
        'content-type': 'Application/json',
        'X-Requested-With': 'XMLHttpRequest',

 'MyClientCert': '',
'MyToken': ''
      }),
    };
  }


     private ApiUrl = `http://ahmedrefaay-001-site1.ctempurl.com/API/api/Order`;

    //
     GetAllByUserId(userid:string):Observable<IOrder[]>{
      return this.httpclient.get<IOrder[]>(`${this.ApiUrl}/GetAllOrders?UserID=${userid}`);
    }

    GetById(id:string):Observable<IOrder>{
      return this.httpclient.get<IOrder>(`${this.ApiUrl}/GetOrderDetails?Id=${id}`);
    }

    CreatOrder(UserID:number , Order:IOrderCreate):Observable<any>{

    return this.httpclient.post<IOrderCreate>(`${this.ApiUrl}/CreateOrder`,JSON.stringify(Order),this.httpHeader);


      // const orderbody={
      //   orderItem: Order.orderItem,
      //   cardId: Order.cardId,
      //   userID: Order.userID,
      //   shippingPrice: Order.shippingPrice,
      //   tax: Order.tax,
      //   dateOrder: Order.dateOrder,
      //   orderStatus: Order.orderStatus,
      //   deliveryDate: Order.deliveryDate,
      //   total: Order.total
      // };

      // return this.httpClient.post<any>(`${this.ApiUrl}/CreateOrder`,orderbody)



    }




    DeleteOrder(id:number):Observable<any>{
      return this.httpclient.delete(`${this.ApiUrl}/DeleteOrder?id=${id}`)
    }



    // UpdateOrder(id:number , Orders:OrderItems[]):Observable<any>{
    //   const orderbody=[
    //     {
    //       orderItem: Orders.orderItem,
    //       cardId: Order.cardId,
    //       userID: Order.userID,
    //       shippingPrice: Order.shippingPrice,
    //       tax: Order.tax,
    //       dateOrder: Order.dateOrder,
    //       orderStatus: Order.orderStatus,
    //       deliveryDate: Order.deliveryDate,
    //       total: Order.total
    //     },

    //   ]
    //   ;
    //   return this.httpClient.patch(`${this.ApiUrl}/UpdateOrder?Id=${id}` ,orderbody);
    // }




}


