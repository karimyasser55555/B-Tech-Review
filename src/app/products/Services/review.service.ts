import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment.development';
import { Review } from 'src/app/cart/Models/review';
@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private apiUrl = `http://ahmedrefaay-001-site1.ctempurl.com/API/api/Review`;

  constructor(private http: HttpClient) { }

  getAll(productId: any): Observable<Review[]> {
    const url = `${this.apiUrl}/GetAllReview?productId=${productId}`;
    return this.http.get<Review[]>(url);
  }
  add(productId: any, review: Review): Observable<any> {
    const url = `${this.apiUrl}/CreateReview`;
    const body = {
      comment: review.comment,
      rate: review.rate,
      date: review.date,
      userId: review.userId,
      productId: productId
    };
    return this.http.post<any>(url, body);
  }


  delete(id: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
