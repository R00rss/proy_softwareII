import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PassengerInfo } from 'src/app/model/passengers';


@Injectable({
  providedIn: 'root'
})
export class PassengersService {
  private selectedPassengerSubject: BehaviorSubject<PassengerInfo[]> = new BehaviorSubject<PassengerInfo[]>([]);
  public selectedPassenger$: Observable<PassengerInfo[]> = this.selectedPassengerSubject.asObservable();

  constructor() { }
  setSelectedPassenger(passenger: PassengerInfo[]) {
    console.log({ passenger })
    this.selectedPassengerSubject.next(passenger);
  }
  getSelectedPassenger(): PassengerInfo[] {
    return this.selectedPassengerSubject.value;
  }
  reset() {
    this.selectedPassengerSubject.next([]);
  }
}
