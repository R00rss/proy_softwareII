import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlockGUIService {

  private isBlockedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isBlocked$: Observable<boolean> = this.isBlockedSubject.asObservable();

  constructor() { }

  blockGUI() {
    this.isBlockedSubject.next(true);
  }

  unblockGUI() {
    this.isBlockedSubject.next(false);
  }
}
