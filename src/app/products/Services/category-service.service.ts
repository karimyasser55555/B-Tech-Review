import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Icategory } from '../Models/icategory';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  constructor(private httpClient : HttpClient) { }

  GetAllCateogories():Observable<Icategory[]>{
   return this.httpClient.get<any>("http://ahmedrefaay-001-site1.ctempurl.com/API/api/Category/GetAllCategory")
   //return this.httpClient.get<Icategory[]>(`${environment.APIURL }/categories` )
  }


  // GetAllCateogories():Observable<ICategory[]>{
  //   return this.httpClient.get<ICategory[]>("http://localhost:3000/categories")
  //  }


  //  GetCategoryByCatId(catid:number):Observable<ICategory>{
  //   return this.httpClient.get<ICategory>(`http://localhost:3000/categories?id=${catid}`);
  // }
}
