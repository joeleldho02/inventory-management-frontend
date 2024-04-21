import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) { }
  
  getAllUsers(page:number = 1, itemsPerPage: number = 10):Observable<{users:UserModel[], totalItems:number}>{
    return this._http.get<{users:UserModel[], totalItems:number}>(`${environment.USER_SERVICE_URL}/api/user-service/users?page=${page}&limit=${itemsPerPage}`);
  }
  getUser(id:String):Observable<UserModel>{     
    return this._http.get<UserModel>(`${environment.USER_SERVICE_URL}/api/user-service/user/${id}`);
  }
  getUsersCount(id:String):Observable<{count:number}>{     
    return this._http.get<{count:number}>(`${environment.USER_SERVICE_URL}/api/user-service/users?count=true`);
  }
  addUser(userData:UserModel){   
    return this._http.post(`${environment.USER_SERVICE_URL}/api/user-service/user`, userData);
  }
  updateUser(userData:UserModel){
    return this._http.patch(`${environment.USER_SERVICE_URL}/api/user-service/user/${userData._id}`, userData);
  }
  deleteUser(id:String){
    return this._http.delete(`${environment.USER_SERVICE_URL}/api/user-service/user/${id}`);
  }
  updateUserStaus(data:UserModel){
    return this._http.patch(`${environment.USER_SERVICE_URL}/api/user-service/user/update-status`, data);
  }
}
