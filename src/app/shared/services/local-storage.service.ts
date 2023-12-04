import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  setUserName(userName: any) {
    localStorage.setItem('userName', userName);
  }

  getUserName() {
    return localStorage.getItem('userName');
  }

  setUserEmail(userEmail: any) {
    localStorage.setItem('userEmail', userEmail);
  }

  getUserEmail() {
    return localStorage.getItem('userEmail');
  }

  setUserId(userId: any) {
    localStorage.setItem('userId', userId);
  }

  getUserId() {
    return localStorage.getItem('userId');
  }

  setUserToken(userToken: any) {
    localStorage.setItem('userToken', userToken);
  }

  getUserToken() {
    return localStorage.getItem('userToken');
  }

  setUserRefreshToken(userRefreshToken: any) {
    localStorage.setItem('userRefreshToken', userRefreshToken);
  }

  getUserRefreshToken() {
    return localStorage.getItem('userRefreshToken');
  }

  clearLocalStorage() {
    localStorage.clear();
  }
}
