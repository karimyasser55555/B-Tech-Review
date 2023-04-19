import { Iproduct } from "src/app/products/Models/iproduct";

export interface IOrder {
  id:number,
  orderStatus: string,//
  orderItems:Iproduct[], //
  dateOrder:Date,//
  total:number,
  deliveryDate:Date,//
  shippingPrice:number,//
  tax:number,//
  quantity:number,
  userId:number, //
  paymenId:number  //
}
