import { Data } from "@angular/router";

export interface AuthModel {
  userId:string;
  message :string;
  isAuthenticated:boolean;
  username:string;
  email:string;
	token:string;
	expiresOn:string;
	roles:string;
}
