import { Injectable } from '@angular/core';
import { Message } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  // atributes to show or hide messages
  private isVisibleMessageSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isVisibleMessage$: Observable<boolean> = this.isVisibleMessageSubject.asObservable();
  // atributes with the content of messages
  private messageSubject: BehaviorSubject<Message> = new BehaviorSubject<Message>({});
  public message$: Observable<Message> = this.messageSubject.asObservable();

  constructor() { }

  showMessage() {
    this.isVisibleMessageSubject.next(true);
  }
  showMessageWithContent(message: Message) {
    this.showMessage();
    this.messageSubject.next(message);
    setTimeout(() => this.hideMessage(), 3000);
  }
  hideMessage() {
    this.isVisibleMessageSubject.next(false);
    this.messageSubject.next({});
  }

}
