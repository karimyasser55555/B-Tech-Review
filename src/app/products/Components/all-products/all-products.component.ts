import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { CategoryServiceService } from '../../Services/category-service.service';
import { CommonModule } from '@angular/common';
import { ProductServicesService } from '../../Services/product-services.service';
import { Icategory } from '../../Models/icategory';
import { Iproduct } from '../../Models/iproduct';
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
//@NgModule({imports: [CommonModule]})
export class AllProductsComponent implements OnInit {
  inputPrice:number=0 ;
 currentCulture: string;
 categories:Icategory[]=[];
 Productslastseen:Iproduct[]=[];

  constructor(private CategoryService:CategoryServiceService,private route:Router,private translate: TranslateService,private productService:ProductServicesService) {
    this.currentCulture = 'en';
   }

  ngOnInit(): void {
   this.GetCategories()
   this.Getproductslastseen()
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentCulture = event.lang;
    });

  }

  GetCategories() {
    this.CategoryService.GetAllCateogories().subscribe((res:any)=>{
      this.categories=res;
      console.log(this.categories)
    } ,error=>{
      console.log(error)
     //console.log(error.message)
    }
    )
}
Getproductslastseen(){
  this.productService.GetAllProducts().subscribe((res:any)=>{
    this. Productslastseen=res;
    console.log(this. Productslastseen)
  } ,error=>{
    console.log(error)
   //console.log(error.message)
   console.log(this. Productslastseen[0].imagePath)
   console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  }
  )
}
  OpenPrdDetails(id:number){
    this.route.navigate(['ProductDetails',id])
  }
  OpenPrdByCatId(CategoryId: number) {
    this.route.navigate(['Categoryproducts', CategoryId]);
    console.log(CategoryId)
  }
  GetPrdByCatId(){
    this.productService.GetProductByCatId
  }
  AddToCart(prd:number)
  {


  }

  filterProduct()
  {

  }

  filterByName(item:string)
  {

  }


  test(catid:number){
    this.route.navigate(['Categoryproducts',catid])
    console.log(catid)
  }
}
