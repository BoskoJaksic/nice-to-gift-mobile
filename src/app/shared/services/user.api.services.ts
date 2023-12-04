import {Injectable} from '@angular/core';
import {ApiService} from "../../core/api.service";
import {Observable} from "rxjs";
import {UserModel} from "../model/users/user.model";
import {UpdateUserModel} from "../model/users/updateUser.model";


@Injectable({
  providedIn: 'root'
})
export class UserApiServices {

  constructor(private apiService: ApiService) {
  }

  getUsersData(userId: any): Observable<UserModel> {
    return this.apiService.get(`Users/${userId}`);
  }

  updateUser(userId: string, data: any): Observable<UpdateUserModel> {
    return this.apiService.put(`Users/${userId}`, data);
  }

}
