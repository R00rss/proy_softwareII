import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OPTIONS_TRIP } from 'src/app/constants/filters';

export interface Destinations {
  id: string;
  country: string;
  city: string;
}

export interface comboItem {
  name: string;
  code: string;
}

@Injectable({
  providedIn: 'root'
})
export class AirportsService {

  baseUrl: string = "http://localhost:8000"

  constructor(public http: HttpClient) { }

  mapperDestinationsToCombo(destinations: Destinations[]): comboItem[] {
    return destinations.map(destination => ({
      name: `${destination.city}, ${destination.country}`,
      code: destination.city
    }));
  }

  getDestinationsCombo(): Observable<comboItem[]> {
    return this.getDestinations().pipe(
      map(destinations => this.mapperDestinationsToCombo(destinations))
    );
  }

  getDestinations(): Observable<Destinations[]> {
    return this.http.get<Destinations[]>(`${this.baseUrl}/destinations`)
  }

  getOptionsTrip(): Observable<comboItem[]> {
    return of([
      {
        name: 'Ida',
        code: OPTIONS_TRIP.ONE_WAY
      },
      {
        name: 'Ida y Vuelta',
        code: OPTIONS_TRIP.ROUND_TRIP
      }
    ])
  }
}
