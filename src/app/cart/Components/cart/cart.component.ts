import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Iproduct } from 'src/app/products/Models/iproduct';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { IproductDto } from 'src/app/products/Models/iproduct-dto';
import { IUser } from '../../Models/i-user';
import { IOrder } from '../../Models/iorder';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit,OnChanges{
  currentCulture: string;
  TPrice:number=0;
  length: number = 0;
  //Order:IOrder;
  items:IproductDto[] = [];
  public TotalPrice: number | undefined ;
  totalprice: number[] = [];
  OrderTotalPrice:number=0;
  userId:number=1;
  constructor(
    private translate: TranslateService,
    private route: Router,


  ) {
    this.currentCulture = 'en';

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.calcTotalPrice()
    //location.reload()
  }
  ngOnInit(): void {
   // location.reload()
// this.loadCart()
  this.getItems();
  // console.log(this.getItems())
  console.log('in card ',this.items);
  this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    this.currentCulture = event.lang;
    location.reload()
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
  calcTotalPrice() {
    this.TotalPrice = 0;
    for (const i of this.items) {
      if(i.avaiUnit>=0)
      this.TotalPrice += i.avaiUnit * i.totalPrice;
      else{
        i.avaiUnit=0;
      }
    }
  }
  CheckOut(){
    this.route.navigate(['CheckOut']);
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
}

