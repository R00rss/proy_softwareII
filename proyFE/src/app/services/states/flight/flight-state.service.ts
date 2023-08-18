import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Flight } from '../../flights/flights.service';

@Injectable({
  providedIn: 'root'
})
export class FlightStateService {
  private selectedFlightSubject: BehaviorSubject<Flight | undefined> = new BehaviorSubject<Flight | undefined>(undefined);
  public selectedFlight$: Observable<Flight | undefined> = this.selectedFlightSubject.asObservable();
  constructor() { }
  setSelectedFlight(flight: Flight) {
    console.log({ flight })
    this.selectedFlightSubject.next(flight);
  }

  getSelectedFlight(): Flight | undefined {
    return this.selectedFlightSubject.value;
  }
  reset() {
    this.selectedFlightSubject.next(undefined);
  }
}
