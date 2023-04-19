import { Component, OnInit } from '@angular/core';
import { WishListService } from '../../Services/wish-list.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {
  UserID: number =1;
  wishlist: any[] = [];

  constructor(private wishlistService: WishListService) { }

  ngOnInit(): void {
    // Get the current user ID from the authentication service
    this.UserID = 1; // Replace with your authentication service logic


  }

  }
