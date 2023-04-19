import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserData } from '../Model/user-data';
import { Observable, map } from 'rxjs';
import { Iloginuser } from '../Model/iloginuser';
import { AuthModel } from '../Model/auth-model';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  httpHeader = {};
  constructor(private http: HttpClient) {
    this.httpHeader = {
      headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
              'MyClientCert': '',        // This is empty
              'MyToken': ''              // This is empty
      }),
    };
  }
  apiurl='http://ahmedrefaay-001-site1.ctempurl.com/API/api/User/Register';

  apiurl1='http://ahmedrefaay-001-site1.ctempurl.com/API/api/User/login';

  RegisterUser(inputdata:UserData):Observable<AuthModel>{
    return this.http.post<AuthModel>(`${this.apiurl}`,JSON.stringify(inputdata),this.httpHeader);
  }


  login(login:Iloginuser):Observable<AuthModel>{
    return this.http.post<AuthModel>(this.apiurl1, login)
    .pipe(map((login) => {
      // store user details jwt token in localStorage
      return login;
    }));
  }




//   GetUserbyCode(id:any){
//     return this.http.get(this.apiurl+'/'+id);
//   }
//   Getall(){
//     return this.http.get(this.apiurl);
//   }


//   updateuser(id:any,inputdata:any){
//     return this.http.put(this.apiurl+'/'+id,inputdata);
//   }


//   getuserrole(){
//     return this.http.get('http://localhost:3000/role');
//   }

//   isloggedin(){
//     return localStorage.getItem('currentUser')!=null;
//   }



//   getrole(){
//     return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
//   }

//   Getaccessbyrole(role:any,menu:any){
//     return this.http.get('http://localhost:3000/roleaccess?role='+role+'&menu='+menu)
//   }
}
