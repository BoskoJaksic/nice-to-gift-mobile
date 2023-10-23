// route-state.service.ts
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteStateService {
  private previousUrl: string = '';

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.router.url;
      }
    });
  }

  getPreviousUrl(): string {
    return this.previousUrl;
  }
}
