import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceiverMessageService {
  private receiverMessageSubject = new BehaviorSubject<string>('');

  setReceiverMessage(message: string): void {
    this.receiverMessageSubject.next(message);
  }

  getReceiverMessage(): BehaviorSubject<string> {
    return this.receiverMessageSubject;
  }
}
