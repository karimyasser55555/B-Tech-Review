import { Component, OnInit,Input,OnChanges, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Icategory } from 'src/app/products/Models/icategory';
import { Iproduct } from 'src/app/products/Models/iproduct';
import { CategoryServiceService } from 'src/app/products/Services/category-service.service';
import { ProductServicesService } from 'src/app/products/Services/product-services.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  searchItems: Iproduct[] = [];
  prdOfferlist: Iproduct[] = [];
  searchLanguage: string="en";
   catlist:Icategory[]=[];
  SelectedCatId: number = 0;
  currentCulture: string;


  constructor(
  private productService: ProductServicesService,
    public translate: TranslateService,
    private route: Router,
    private CategoryService:CategoryServiceService,
  ) {
    this.currentCulture = 'en';
  }

  ngOnInit(): void {
    this.GetCategories()
    // this.categoryApiService.GetAllCateogories()
    //   .subscribe((list) => (this.catlist = list));

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentCulture = event.lang;
    })

  }
  GetCategories() {
    this.CategoryService.GetAllCateogories().subscribe((res:any)=>{
      this.catlist=res;
      console.log(this.catlist)

    })
}


  OpenPrdByCatId(categoryId: number) {
    this.route.navigate(['Categoryproducts', categoryId]);
  }


  filterByName(item: string) {
    var english = /^[A-Za-z0-9]*$/;

    if (english.test(item)) {
    this.searchLanguage="en";
      this.searchItems = this.prdOfferlist.filter((b) =>
       b.name.toUpperCase().includes(item.toUpperCase())
      );
    } else {
      this.searchLanguage="ar";

      this.searchItems = this.prdOfferlist.filter((b) =>
      b.nameArabic.toUpperCase().includes(item.toUpperCase())
      );
    }

    if (item == "" || item.length == 0) {
      this.searchItems = [];
    }

  }
  search(search: string){
    this.route.navigate(['Search',search])
  }


  OpenPrdDetails(id:number){
    this.route.navigate(['ProductDetails',id])
  }
}
