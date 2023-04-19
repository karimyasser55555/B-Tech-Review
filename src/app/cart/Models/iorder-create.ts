import { OrderItems } from "./order-items";

export interface IOrderCreate {
 orderItem:OrderItems[],
CardId:number,
UserID:number,
ShippingPrice:number,
Tax:number,
DateOrder:Date,
OrderStatus:string,
DeliveryDate:Date,
Total:number,
}
