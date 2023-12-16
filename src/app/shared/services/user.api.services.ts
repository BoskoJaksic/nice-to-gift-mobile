import {Injectable} from '@angular/core';
import {ApiService} from "../../core/api.service";
import {Observable} from "rxjs";
import {UserModel} from "../model/users/user.model";
import {UpdateUserModel} from "../model/users/updateUser.model";
import {LocalStorageService} from "./local-storage.service";


@Injectable({
  providedIn: 'root'
})
export class UserApiServices {

  constructor(private apiService: ApiService, private localStorageService: LocalStorageService) {
  }

  getUsersData(userId: any): Observable<UserModel> {
    return this.apiService.get(`Users/${userId}`);
  }

  updateUser(userId: string, data: any): Observable<UpdateUserModel> {
    return this.apiService.put(`Users/${userId}`, data);
  }

  deleteAccount(userId: any): Observable<any> {
    return this.apiService.delete(`Users/regular-user/${userId}`,'');
  }


  isUserLoggedIn() {
    let userEmail = this.localStorageService.getUserEmail()
    return !!userEmail;
  }
}
