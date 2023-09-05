import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Seat {
  seat_number: string;
  seat_type: string;
  seat_status: string;
  plane_id: string;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlaneSeatsService {
  seatUrl: string = "http://localhost:8000/plane_seat"
  constructor(public http: HttpClient) { }

  getSeatsByPlaneId(plane_id: string): Observable<Seat[]> {
    return this.http.get<Seat[]>(`${this.seatUrl}/${plane_id}`)
  }
  getSeats(){
    return this.http.get<Seat[]>(this.seatUrl)
  }
  updateSeats(seats: Seat[]): Observable<Seat[]> {
    return this.http.put<Seat[]>(this.seatUrl+"/list", seats)
  }
}
