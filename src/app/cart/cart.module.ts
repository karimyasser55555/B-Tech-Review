import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './Components/cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from  '@angular/common/http';
import { RouterModule } from '@angular/router';
import { OrderComponent } from './Components/order/order.component';
import { CheckOutComponent } from './Components/check-out/check-out.component';
import { WishListComponent } from './Components/wish-list/wish-list.component';



@NgModule({
  declarations: [
    CartComponent,
    OrderComponent,
    CheckOutComponent,
    WishListComponent,


  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      defaultLanguage:'en',
      loader:{
        provide:TranslateLoader,
        useFactory : httpTranslateLoader,
        deps:[HttpClient]
      }
    })

  ],

  providers: [],



})
export class CartModule { }
export function httpTranslateLoader(http:HttpClient){
  return new  TranslateHttpLoader(http,'./assets/i18n/','.json')
  //D:\ITI FULL STACK .NET\final project\FrontEndAngular\B-Tech\src\assets\i18n\ar.json
}
