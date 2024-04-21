import { Injectable } from "@angular/core";
import { UserModel } from "../../features/admin/models/user.model";
import { ROLES } from "@enums";

@Injectable({
    providedIn: 'root'
  })
  export class StorageService {
    constructor() { }
  
    getToken():string | null{
      return localStorage.getItem("token");
    }
  
    getUser():UserModel | null{
      const user = localStorage.getItem('user');  
      if( typeof user === 'string'){      
        const userParsed = JSON.parse(user) as UserModel;
        return userParsed;
      }else{
        return null;
      }
    }
  
    saveToken(token:string):void{
      localStorage.removeItem("token");
      localStorage.setItem("token", token); 
    }
    
    saveUser(user:any){
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(user));
    }
  
    isLoggedIn():boolean{
      if(localStorage.getItem("user")){
        return true;
      }
      return false;
    }
  
    isAdminLoggedIn(): boolean{
      if(this.getToken() === null){
        return false;
      }
      const user = this.getUser();
      if(user){
        return user.roles.includes(ROLES.Admin);
      }
      return false;
    }
  
    isUserLoggedIn(): boolean{
      if(this.getToken() === null){
        return false;
      }
      const user = this.getUser();
      if(user){
        return !user.roles.includes(ROLES.Admin) ;
      }
      return false;
    }
  
    logout(){
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }
  