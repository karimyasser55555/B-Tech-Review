import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import {render} from 'creditcardpayments/creditCardPayments' ;

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent {
  currentCulture: string;
  constructor(
    private translate: TranslateService,
    private route: Router,
    private location: Location,

  ) {
    this.currentCulture = 'en';
    render(
      {
        id:"#paypalbutton",
        currency:"USD",
        value:"100.00",
        onApprove:(details)=>{
          alert("Transaction Successfull")

        }
      }
    )
  }

  GoBack(){

    this.route.navigate(['cart']);
  }

}
