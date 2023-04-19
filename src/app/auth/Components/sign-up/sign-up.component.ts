import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthServiceService } from '../../Service/auth-service.service';
import { UserData } from '../../Model/user-data';
import { AuthModel } from '../../Model/auth-model';
import { AuthModule } from '../../auth.module';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUPComponent implements OnChanges{

  currentCulture: string ;
  searchLanguage: string="ar";
  constructor(private builder: FormBuilder, private service: AuthServiceService, private router: Router,public translate: TranslateService
    ) {
      this.currentCulture = 'en';

  }
 userregister:UserData= {} as UserData;
 rec:AuthModel={} as AuthModel;
 mess:string="";
confirmpassword:any;

 ngOnChanges(changes: SimpleChanges): void {

}
  proceedregister() {

              this.service.RegisterUser(this.userregister).subscribe({
                next: (data) => {

                  this.rec=data;
                  console.log(this.rec.message);
                  if(this.rec.message=="Password and confirmedpassword are not match" )
                    {
                      this.mess=this.rec.message;
                      console.log("hello")
                      // this.router.navigate(['/registerUser'])

                    }
                    else if(this.rec.message=="Email Is Already Registered")
                    {
                      this.mess=this.rec.message;
                    }
                    else if(this.rec.message=="UserName Is Already Registered")
                    {
                      this.mess=this.rec.message;

                    }
                  else
                  {
                     this.router.navigate(['/Acount'])
                 }

                },
                error: (err) => {
                  console.log(err.message);
                   this.router.navigate(['/UserRegister'])

                }

              });
    }




    }



