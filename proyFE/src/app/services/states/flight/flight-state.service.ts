import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Flight } from '../../flights/flights.service';

export interface Client {
  name: string,
  lastName: string,
  passport: string,
  birdDate: Date
}

@Injectable({
  providedIn: 'root'
})
export class FlightStateService {
  private selectedFlightSubject: BehaviorSubject<Flight | undefined> = new BehaviorSubject<Flight | undefined>(undefined);
  public selectedFlight$: Observable<Flight | undefined> = this.selectedFlightSubject.asObservable();

  private selectedFlightReturnSubject: BehaviorSubject<Flight | undefined> = new BehaviorSubject<Flight | undefined>(undefined);
  public selectedFlightReturn$: Observable<Flight | undefined> = this.selectedFlightReturnSubject.asObservable();

  constructor() { }
  setSelectedFlight(flight: Flight) {
    console.log({ flight })
    this.selectedFlightSubject.next(flight);
  }

  getSelectedFlight(): Flight | undefined {
    return this.selectedFlightSubject.value;
  }
  setSelectedFlightReturn(flight: Flight) {
    console.log({ flight })
    this.selectedFlightReturnSubject.next(flight);
  }
  getSelectedFlightReturn(): Flight | undefined {
    return this.selectedFlightReturnSubject.value;
  }
  reset() {
    this.selectedFlightSubject.next(undefined);
  }
  resetReturn() {
    this.selectedFlightReturnSubject.next(undefined);
  }
}
