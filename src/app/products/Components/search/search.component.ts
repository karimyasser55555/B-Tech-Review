import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { ProductServicesService } from '../../Services/product-services.service';
import { Iproduct } from '../../Models/iproduct';





@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchWord:string ="";
  productlist!:Iproduct[];
  searchLanguage: string="ar";
  searchItems: Iproduct[] = [];
  currentCulture: string;

    constructor(private productservice: ProductServicesService,
      private activedRoute: ActivatedRoute,
      private translate: TranslateService,
      private route:Router
     ) {
        this.currentCulture = 'en';

      }

    ngOnInit(): void {

        this.searchWord = String(this.activedRoute.snapshot.paramMap.get('search'))

      this.productservice.GetAllProducts()
      .subscribe((prdList) => {
        this.productlist = prdList;

        var english = /^[A-Za-z0-9]*$/;

        if (english.test(this.searchWord)) {
        this.searchLanguage="en";
          this.searchItems = this.productlist.filter((b) =>
            b.name.toUpperCase().includes(this.searchWord.toUpperCase())
          );
        } else {
          this.searchLanguage="ar";

          this.searchItems = this.productlist.filter((b) =>
            b.nameArabic.toUpperCase().includes(this.searchWord.toUpperCase())
          );
        }
    this.productlist.map(i =>i.imagePath=i.imagePath)    //??????????/
    console.log(this.searchItems);
  });


  this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    this.currentCulture = event.lang;
  });

    }
    OpenPrdDetails(id:number){
      this.route.navigate(['ProductDetails',id])
    }


    AddToCart(prd:Iproduct)
    {
      // this.shoppingCartservice.addToCart(prd);
      // Swal.fire("Done","You Add Success","success");


    }
  }
