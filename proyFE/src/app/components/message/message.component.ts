import { Component } from '@angular/core';
import { Message } from 'primeng/api';
import { Subscription } from 'rxjs';
import { MessagesService } from 'src/app/services/gui/messages/messages.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  messages: Message[] = [];
  isVisibleMessage: boolean = false;
  private subscription: Subscription;


  constructor(private messagesService: MessagesService) {
    this.subscription = this.messagesService.message$.subscribe((message) => {
      this.messages = [];
      this.messages.push(message);
    });
    this.subscription = this.messagesService.isVisibleMessage$.subscribe((isVisibleMessage) => {
      this.isVisibleMessage = isVisibleMessage;
    }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
