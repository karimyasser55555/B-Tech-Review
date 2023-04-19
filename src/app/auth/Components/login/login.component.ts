import { Component, inject, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Iloginuser } from '../../Model/iloginuser';
import { AuthServiceService } from '../../Service/auth-service.service';
import { AuthModel } from '../../Model/auth-model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  currentCulture: string ;
  searchLanguage: string="ar";
  login:Iloginuser={} as Iloginuser;

  UserName:string="";
  UserId:number=0;
  Email:string="";
  IsAuthenticated:boolean=false;
  rec:AuthModel={} as AuthModel;
  mess:string="";

    constructor(private route: Router
      ,public translate: TranslateService, private http:HttpClient ,private loginservice:AuthServiceService,private router: Router) {
        this.currentCulture = 'en';

       }
    ngOnInit(): void {
      }


      proceedLogin()
      {
      this.loginservice.login(this.login).subscribe(
        data => {

         this.rec=data;

         if(this.rec.message=="There is no user with this Email" )
         {
                   this.mess=this.rec.message;
         }

       else if(this.rec.message=="Invalid Password" )
         {
           this.mess=this.rec.message;

         }
         else{
         console.log(this.rec.message)

         this.UserId=parseInt(this.rec.userId);
         this.Email=this.rec.email;
         this.UserName=this.rec.username;
         this.IsAuthenticated=this.rec.isAuthenticated;
         localStorage.setItem('currentUserId', JSON.stringify(this.UserId));
         localStorage.setItem('currentUserUseName', JSON.stringify(this.UserName));
         localStorage.setItem('currentUserEmail', JSON.stringify(this.Email));
         localStorage.setItem('currentUserIsAuth', JSON.stringify(this.IsAuthenticated));

         this.router.navigate(['/Products'])
        }

        },
        error => {
          this.router.navigate(['/Acount'])
          console.log(error)
        }
      );
    }
  }

