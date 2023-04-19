import { Component , OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import {Location} from '@angular/common';
import { ProductServicesService } from '../../Services/product-services.service';

import Swal from 'sweetalert2';
import { IproductDto } from '../../Models/iproduct-dto';
import { Review } from 'src/app/cart/Models/review';
import {FormBuilder ,FormControl, FormGroup } from '@angular/forms';
import { ReviewService } from '../../Services/review.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
 // url: string = `http://localhost:3000`;
  totalprice:number=0;
  currentPrdID: number = 0;
 // mainImage: string = `http://localhost:3000`;
  currentCulture: string;
  products:any[]=[];
  constructor(
    private activedRoute: ActivatedRoute,
    private translate: TranslateService,
    private location: Location,
    private productService: ProductServicesService,
    private route:Router,
    private reviewService: ReviewService,
  ) {
    this.currentCulture = 'en';
  }
    //<-- ----------------Product---------------- -->
   product!:any;
   items:IproductDto[] = [];

 //<-- ----------------Reviews---------------- -->
 public reviews: Review[] = [];
 reviewForm = new FormGroup({
  username: new FormControl(''),
  comment: new FormControl(''),
  rate: new FormControl(0),
});


   AddToCart(product: IproductDto) {
    let storedItems = JSON.parse(localStorage.getItem('orderItems') || '[]') as IproductDto[];
    let updated = false;

    for (let item of storedItems) {
      if (item.id === product.id) {
        item.avaiUnit += 1;
       this.totalprice = item.price * item.avaiUnit;
        updated = true;
        break;
      }
    }

    if (!updated) {
      product.avaiUnit = 1;
      this.totalprice = product.price * product.avaiUnit;
      storedItems.push(product);
    }

    localStorage.setItem('orderItems', JSON.stringify(storedItems));

    Swal.fire('Done', 'You Add Success', 'success');
  }

  ngOnInit(): void {
    // this.currentprodID= (this.activatedRoute.snapshot.paramMap.get('id'))?Number(this.activatedRoute.snapshot.paramMap.get('id')):0;
// let ReturnedProd=this.productservice.GetProductsDetailsByID(this.currentprodID);
// if(ReturnedProd){
// this.prod=ReturnedProd;

// }
// else{
// alert("Not Found")
// }
    const id = (this.activedRoute.snapshot.paramMap.get('id'))?Number(this.activedRoute.snapshot.paramMap.get('id')):0;
    console.log(id);
    this.productService.GetProductsDetailsByID(id).subscribe({
      next:(product)=>{
        // console.log(product);
        // console.log(product.imagesPath);
        // console.log(product.nameArabic);
        // console.log("qqqqqqqqqqqq");
        this.product = {
          id:id,
          name:product.name,
          nameArabic:product.nameArabic,
          discription:product.discription,
          discArabic:product.discArabic,
          price:product.price,
          discount:product.discount,
          avaiUnit: product.avaiUnit,
          imagesPath:product.imagesPath,
          categoryId:product.categoryId,

          totalPrice:product.totalPrice


        }
        //this.mainImage+=product.img;
        // console.log(this.product);
        // console.log(this.product.imagesPath);
        // console.log("vscgvdgvcgdvsajcvadsvjavjgagaav");




      },
      error:(err)=>{
      console.log(err);

      }
    })
    // call backend service to get details

    ;

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentCulture = event.lang;
    });
//<-- ----------------Reviews---------------- -->
this.activedRoute.params.subscribe((params) => {
  // get product details based on product ID in route params
  const productId = params['id'];
  this.product = {
    id: productId,
    name: 'Product ' + productId,
    discription: 'Lorem ipsum dolor sit amet.',
  };

  // get all reviews for the product
  this.reviewService.getAll(productId).subscribe((reviews) => {
    this.reviews = reviews;
    console.log(this.reviews)
    console.log("x\vbxz bcv  cn vbmnnchvm")
  });
});
}
prevPage() {
this.location.back();
}
//<-- ----------------Reviews---------------- -->
onSubmit(): void {
const productId = this.product.id;
const review:Review = {
  userId: "3",
  comment: this.reviewForm.controls.comment.value ?? '',
  rate: this.reviewForm.controls.rate.value ?? 0,
  productId: productId,
  id: '',
  date: new Date()

};
console.log(review);

this.reviewService.add(productId,review).subscribe(() => {
  // clear the form and reload the reviews
 this.reviewForm.reset();
  this.reviewService.getAll(productId).subscribe((reviews) => {
    this.reviews = reviews;
    console.log(this.reviews);
    console.log("111111111111111111111111");
  });
});
}
}


