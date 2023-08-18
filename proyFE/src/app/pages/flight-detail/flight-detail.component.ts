import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EXAMPLE_FLIGHTS } from 'src/app/constants/global';
import { Flight } from 'src/app/services/flights/flights.service';
import { FlightStateService } from 'src/app/services/states/flight/flight-state.service';

@Component({
  selector: 'app-flight-detail',
  templateUrl: './flight-detail.component.html',
  styleUrls: ['./flight-detail.component.css']
})

export class FlightDetailComponent {
  detalleId: number | undefined;
  flight: Flight | undefined;
  flightToString = "";
  moreInformation = false;

  handleMoreInformation() {
    this.moreInformation = !this.moreInformation;
  }

  constructor(private route: ActivatedRoute, private flightStateService: FlightStateService, private router: Router) { }

  ngOnInit(): void {
    if (this.flightStateService.getSelectedFlight() === undefined) {
      this.flightStateService.reset();
      this.router.navigate(['/home'])
    }
    this.flight = this.flightStateService.getSelectedFlight();
    this.flightToString = JSON.stringify(this.flight);
    // this.flight = EXAMPLE_FLIGHTS[0];
    // this.flightToString = JSON.stringify(this.flight);

    this.route.params.subscribe(params => {
      this.detalleId = +params['n'];
      console.log(this.detalleId)
    });
  }
}
