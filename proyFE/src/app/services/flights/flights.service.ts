import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, delay } from 'rxjs';
import { ListAndCount } from 'src/app/model/global';
import { Passengers } from 'src/app/model/passengers';

export interface Flight {
  plane_id: string;
  pilot_id: string;
  airport_origin_id: string;
  airport_destination_id: string;
  origin: string;
  destination: string;
  departure: string;
  arrival: string;
  id: string;
  pilot: Pilot;
  plane: Plane;
  cost: number;
  costa: number;
  costb: number;
  airport_origin: Airport;
  airport_destination: Airport;
  direct: boolean;
}

interface Airport {
  name: string;
  city: string;
  country: string;
  code: string;
  id: string;
}

interface Plane {
  model: string;
  capacity: number;
  serial_number: string;
  code: string;
}

interface Pilot {
  name: string;
  lastname: string;
  ci: string;
  license: string;
  id: string;
}

export interface SearchFlightsRequest {
  dateFrom?: Date;
  dateTo?: Date;
  origin?: string;
  destination?: string;
  skip: number;
  limit: number;
  passengers: Passengers;
}

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  baseUrl: string = "https://proyect-software-ii-vercel-c2bwfssqs-r00rss.vercel.app"
  flightsUrl: string = "https://proyect-software-ii-vercel-c2bwfssqs-r00rss.vercel.app/flights"
  constructor(public http: HttpClient) { }

  searchFlights(
    {
      dateFrom,
      dateTo,
      origin,
      destination,
      passengers,
      skip,
      limit,
    }: SearchFlightsRequest): Observable<ListAndCount<Flight>> {

    let params = new HttpParams();
    if (dateFrom) params = params.append('dateFrom', dateFrom.toISOString())
    // if (dateTo) params = params.append('dateTo', dateTo.toISOString())
    if (origin) params = params.append('origin', origin)
    if (destination) params = params.append('destination', destination)
    if (skip !== undefined && skip !== null) params = params.append('skip', skip)
    if (limit !== undefined && limit !== null) params = params.append('limit', limit)
    if (passengers) {
      if (passengers.adults !== undefined && passengers.adults !== null) params = params.append('adults', passengers.adults)
      if (passengers.children !== undefined && passengers.children !== null) params = params.append('children', passengers.children)
      if (passengers.infants !== undefined && passengers.infants !== null) params = params.append('infants', passengers.infants)
      if (passengers.old !== undefined && passengers.old !== null) params = params.append('old', passengers.old)
    }
    return this.http.get<ListAndCount<Flight>>(`${this.flightsUrl}/search`, { params: params })
      .pipe(delay(500))
  }
}
