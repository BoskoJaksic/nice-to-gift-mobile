import { Injectable } from '@angular/core';
import { Keyboard } from '@capacitor/keyboard';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeyboardService {
  private keyboardVisibleSubject = new BehaviorSubject<boolean>(false);
  keyboardVisible$ = this.keyboardVisibleSubject.asObservable();

  constructor() {
    Keyboard.addListener('keyboardWillShow', () => {
      this.keyboardVisibleSubject.next(true);
    });

    Keyboard.addListener('keyboardWillHide', () => {
      this.keyboardVisibleSubject.next(false);
    });
  }
}
