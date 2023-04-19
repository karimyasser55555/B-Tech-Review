import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IproductDto } from 'src/app/products/Models/iproduct-dto';
import { IOrder } from '../../Models/iorder';
import { Router } from '@angular/router';
import { OrderService } from '../../Services/order.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { IOrderCreate } from '../../Models/iorder-create';
import { OrderItems } from '../../Models/order-items';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent  implements OnInit,OnChanges{
  currentCulture: string;
  TPrice:number=0;
  length: number = 0;
  AllOrderItems:OrderItems[]=[]
  Order!:IOrderCreate;
  items:IproductDto[] = [];
  public TotalPrice: number | undefined ;
  totalprice: number[] = [];
  OrderTotalPrice:number=0;
  cardId:number=0;
  userId:number=1;
  constructor(
    private translate: TranslateService,
    private route: Router,
      private orderApi:OrderService,
       private httpclient:HttpClient
  ) {
    this.currentCulture = 'en';

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.calcTotalPrice()
  }
  ngOnInit(): void {
// this.loadCart()
  this.getItems();
  // console.log(this.getItems())
  console.log('in card ',this.items);
  this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    this.currentCulture = event.lang;
  });
  this.length = this.items.length;
  }
  getItems() {
    this.items = this.loadCart();
    let tempItems = [];

    for (let item of this.items) {
      let index = tempItems.findIndex(i => i.id === item.id);

      if (index >= 0) {
        // add to the existing item's quantity and total price
        tempItems[index].avaiUnit += item.avaiUnit;
        tempItems[index].totalPrice += item.totalPrice;
      } else {
        // add the new item to the temporary array
        tempItems.push(item);
      }
    }

    this.items = tempItems;
    return this.items;
  }

  loadCart() {
    const item = window.localStorage.getItem("orderItems");
    const cart = item ? JSON.parse(item) : [];

    for (let product of cart) {
      product.quantity = product.quantity || 1;
      product.totalPrice = product.price * product.quantity;
    }
console.log(cart)
    return cart;
  }
  addToCart(product: IproductDto) {
    const index = this.items.findIndex(item => item.id === product.id);

    if (index >= 0) {
      // product already exists in cart
      this.items[index].avaiUnit++;
      this.items[index].totalPrice = this.items[index].avaiUnit * this.items[index].price;
    } else {

      // product is new to cart
      product.avaiUnit = 1;
      product.totalPrice = product.price;
      this.items.push(product);
    }

    localStorage.setItem('orderItems', JSON.stringify(this.items));
  }

  removeItem(product: IproductDto) {
    const index = this.items.findIndex(item => item.id === product.id);

    if (index >= 0) {
      this.items.splice(index, 1);
      localStorage.setItem('orderItems', JSON.stringify(this.items));
    }
  }

  clearCart() {
    this.items = [];
    localStorage.removeItem('orderItems');
  }
  // calcTotalPrice() {
  //   let totalPrice = 0;
  //   for (let i = 0; i < this.items.length; i++) {
  //   this.items[i].totalPrice = this.items[i].quantity * this.items[i].price;
  //     totalPrice += this.items[i].quantity * this.items[i].totalPrice;
  //   }
  //   this.TotalPrice = totalPrice;
  // }
  calcTotalPrice(): number {
    this.TotalPrice = 0;
    for (const i of this.items) {
      if(i.avaiUnit>=0)
      this.TotalPrice += i.avaiUnit * i.totalPrice;
      else{
        i.avaiUnit=0;
      }
    }
    return this.TotalPrice
  }
  CheckOut(){
let orderitems=this.items.map(item=>{
 return {id:item.id , avaiUnit:item.avaiUnit}
})
 let order={
UserId:this.userId,
date:new Date(),
orderitems:orderitems
    }
    console.log(order)
  }
  Paypal(){
    this.route.navigate(['Paypal'])
  }


  sendOrder(){
  this.AllOrderItems =this.items.map(item=>{
    return {
      //ID:item.id,
      Quantity:item.avaiUnit,
      //OrderID?:number,

        ProductID:item.id,

     // CreatedAt?:Date,
     // UpdatedAt?:Date,
     // DeletedAt?:Date,
    }});
   this.Order = {


orderItem:this.AllOrderItems,
CardId:this.cardId,
UserID:this.userId,
ShippingPrice:50,
Tax:20,
DateOrder:new Date,
OrderStatus:"Shipped",
DeliveryDate:new Date,
Total: this.calcTotalPrice() + 20 + 50,
//calcTotalPrice()
  }


// this.orderApi.CreatOrder(this.userId,this.Order).subscribe(data=>{
// this.userId=data.userId
// this.Order=data.Order
// }
//   )
this.httpclient.post<any>("http://ahmedrefaay-001-site1.ctempurl.com/API/api/Order/CreateOrder" , {
  "orderItem":  [
          {
              "Quantity":2,
              "ProductID":19

          },
          {
              "Quantity":4,
              "ProductID":20
          }
      ]     ,
                         //this.AllOrderItems,
  // "CardId":2,
  // "UserID":1,
  // "ShippingPrice":50,
  // "Tax":20,
  "UserID": 6,
  "ShippingPrice":20,
  "Total":500

 // "Total":this.calcTotalPrice() + 20 + 50
}).subscribe(data=>{
  console.log(data)
})


// {
//   "orderItem":[
//       {
//           "Quantity":2,
//           "ProductID":17

//       },
//       {
//           "Quantity":4,
//           "ProductID":18
//       }
//   ],
//   "UserID":1,
//   "ShippingPrice":20,
//    "Total":500

// }


  console.log(this.Order)
  console.log("123456")
}





}
