import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderIdService {
  private id: string = '';

  constructor() { }

  setID(newID: string) {
    this.id = newID;
  }

  getID() {
    return this.id;
  }

  clearID() {
    this.id = '';
  }
}
