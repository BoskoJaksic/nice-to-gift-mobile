import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {StorageService} from "../shared/services/storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private storageService:StorageService) { }

  async canActivate(){
    const isAuthenticated = await this.storageService.checkIfTokenExists();

    if (isAuthenticated) {
      return true;
    } else {
      await this.router.navigate(['']); // Redirect to the login page if not logged in
      return false;
    }
  }
}
