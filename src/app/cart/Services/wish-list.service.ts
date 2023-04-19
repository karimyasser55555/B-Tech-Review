import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  UserID: any;
  // private apiUrl = 'http://localhost:5000/api/WishList';

  constructor(private http: HttpClient) { }

  create()
 {
  this.http
  .post<any>('http://ahmedrefaay-001-site1.ctempurl.com/API/api/WishList/Create',{"UserID":this.UserID}).subscribe(data=>{
    this.UserID=data.UserID;
  })
 }

  AddProduct(){
    this.http
    .post<any>('http://ahmedrefaay-001-site1.ctempurl.com/API/api/WishList/AddProduct',{"UserID":this.UserID,"productId":15}).subscribe(data=>{
      this.UserID=data.UserID;

    })

    }
  }

