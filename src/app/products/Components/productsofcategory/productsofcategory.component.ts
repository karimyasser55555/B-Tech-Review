import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductServicesService } from '../../Services/product-services.service';

@Component({
  selector: 'app-productsofcategory',
  templateUrl: './productsofcategory.component.html',
  styleUrls: ['./productsofcategory.component.css']
})
export class ProductsofcategoryComponent implements OnInit {
  currentprodID:number=0;
constructor(private activatedRoute:ActivatedRoute,private productservice:ProductServicesService,private location:Location){}
prod:any|undefined=undefined;
  ngOnInit(): void {
    //let productID=this.activatedRoute.snapshot.paramMap.get('prdID');
// this.currentprodID= (this.activatedRoute.snapshot.paramMap.get('catid'))?Number(this.activatedRoute.snapshot.paramMap.get('catid')):0;
// let ReturnedProd=this.productservice.GetProductByCatId(this.currentprodID);
// alert(this.currentprodID)
// console.log(this.currentprodID)
// if(ReturnedProd){
// this.prod=ReturnedProd;

// }
// else{
// alert("Not Found")
// }
//   }

  }
}
