import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  reservationURL: string = "http://localhost:8000/invoice"
  constructor(public http: HttpClient) { }

  createReservation(reservation: any) {
    return this.http.post(this.reservationURL, reservation);
  }
}
