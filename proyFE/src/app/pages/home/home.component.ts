import { Component, OnInit } from '@angular/core';
import { FlightStateService } from 'src/app/services/states/flight/flight-state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private flightStateService: FlightStateService,) { }
  ngOnInit(): void {
    this.flightStateService.reset();
  }

}
