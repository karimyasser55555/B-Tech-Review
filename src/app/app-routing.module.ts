import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './products/Components/all-products/all-products.component';
import { ProductDetailsComponent } from './products/Components/product-details/product-details.component';
import { CartComponent } from './cart/Components/cart/cart.component';
import { LoginComponent } from './auth/Components/login/login.component';
import { TestComponent } from './Components/test/test.component';
import { ProductsofcategoryComponent } from './products/Components/productsofcategory/productsofcategory.component';
import { CategoryproductsComponent } from './products/Components/categoryproducts/categoryproducts.component';
import { SearchComponent } from './products/Components/search/search.component';
import { AboutUsComponent } from './Components/test/about-us/about-us.component';
import { ContactUsComponent } from './Components/test/contact-us/contact-us.component';
import { PaypalComponent } from './cart/Components/paypal/paypal.component';
import { OrderComponent } from './cart/Components/order/order.component';
import { CheckOutComponent } from './cart/Components/check-out/check-out.component';
import { SignUPComponent } from './auth/Components/sign-up/sign-up.component';

const routes: Routes = [
  {path:"Products",component:AllProductsComponent},
  {path:"ProductDetails/:id",component:ProductDetailsComponent},
  {path:"Cart",component:CartComponent},
  {path:"Acount",component:LoginComponent},
  {path:"UserRegister" ,component:SignUPComponent},
{path:"test" ,component:TestComponent},
{path:"cart",component:CartComponent},
//{path:"Order" , component:OrderComponent},
{path:'Search/:search',component:SearchComponent},
{path:"prod" , component:ProductsofcategoryComponent},
{path:'Categoryproducts/:categoryId' , component:CategoryproductsComponent},
{path:"about" , component:AboutUsComponent},
{path:"contact" , component:ContactUsComponent},
{path:"Paypal" , component:PaypalComponent},
{path:"CheckOut" , component:CheckOutComponent},
{path:"**",redirectTo:"Products",pathMatch:"full"},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
