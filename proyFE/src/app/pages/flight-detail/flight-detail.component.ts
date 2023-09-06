import { formatDate } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OPTIONS_TRIP } from 'src/app/constants/filters';
import { EXAMPLE_FLIGHTS } from 'src/app/constants/global';
import { Flight } from 'src/app/services/flights/flights.service';
import { PlaneSeatsService, Seat } from 'src/app/services/seats/plane-seats.service';
import { FilterStateService, Filters } from 'src/app/services/states/filter/filter-state.service';
import { FlightStateService } from 'src/app/services/states/flight/flight-state.service';


enum ESelectedCostKey {
  cost = "cost",
  costa = "costa",
  costb = "costb",
}
@Component({
  selector: 'app-flight-detail',
  templateUrl: './flight-detail.component.html',
  styleUrls: ['./flight-detail.component.css']
})


export class FlightDetailComponent {
  flight: Flight | undefined;
  flightReturn: Flight | undefined;
  priceReturn: number = 0;
  price: number = 0;
  flightToString: string | undefined;
  selectedCostKey: ESelectedCostKey = ESelectedCostKey.costb;
  selectedCostKeyReturn: ESelectedCostKey = ESelectedCostKey.costb;
  totalPassengers: number = 0;
  seats: Seat[] = [];
  setSelectedSeats: Set<Seat> = new Set();
  tarifa: string = '';
  tarifaReturn: string = '';
  filters: Filters | undefined;
  filtersReturn: Filters | undefined;
  showTableFlight: boolean = false;
  isRoundTrip: boolean = false;
  numberOfPassengers: number = 0;
  @ViewChild('modalSeats') modalSeats: ElementRef | undefined;
  @ViewChild('contactDetail') contactDetail: ElementRef | undefined;

  constructor(private route: ActivatedRoute, private flightStateService: FlightStateService, private router: Router
    , private planeSeatsService: PlaneSeatsService, private filterStateService: FilterStateService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (Object.values(ESelectedCostKey).includes(params['selectedCostKey'])) {
        this.selectedCostKey = params['selectedCostKey'];
        this.tarifa = this.getTarifa(this.selectedCostKey);
      }
    });
    
    this.flight = this.flightStateService.getSelectedFlight();

    if (this.flight === undefined) {
      this.flightStateService.reset();
      if (window.history.length > 1) {
        window.history.back();
      }
      return;
    }
    //   this.router.navigate(['/home'])

    this.filters = this.filterStateService.getFiltersSelected();
    if (this.filters === undefined) {
      this.filterStateService.reset();
      if (window.history.length > 1) {
        window.history.back();
      }
      return;
    }

    if (this.filters) {
      console.log('filters', this.filters)
      console.log('type of adults', typeof this.filters.adults)
      const { adults, children, old } = this.filters;
      const totalPassengers = Number(adults) + Number(children) + Number(old);
      this.numberOfPassengers = totalPassengers;

      if (this.flight && this.selectedCostKey in this.flight) {
        this.price = this.flight[this.selectedCostKey];
      }


      console.log('numberOfPassengers', this.numberOfPassengers)
      if (this.filters.trip == OPTIONS_TRIP.ROUND_TRIP) {
        this.isRoundTrip = true;
        this.filtersReturn = this.filterStateService.getFiltersReturnSelected();
        console.log({ filtersReturn: this.filtersReturn })
        console.log({ filters: this.filters })

        this.showTableFlight = true;
      } else {
        this.flightStateService.resetReturn();
      }
    }

    


    // console.log({ filters })
    // this.totalPassengers = 0;
    // if (filters.adults !== undefined && filters.adults !== null) this.totalPassengers += filters.adults;
    // if (filters.children !== undefined && filters.children !== null) this.totalPassengers += filters.children;
    // if (filters.infants !== undefined && filters.infants !== null) this.totalPassengers += filters.infants;
    // console.log({ totalPassengers: this.totalPassengers })
  }

  getTarifa(key: string) {
    if (key === 'cost') return 'Económica';
    if (key === 'costb') return 'Segunda Clase';
    if (key === 'costa') return 'Primera Clase';
    return 'Sin tarifa';
  }
  formatDateToString(date: string): string {
    const dateD = new Date(date);
    return formatDate(dateD, 'EEE, d MMM, y', 'es');
  }
  getFlightFromChild({ flight, keyFee }: { flight: Flight, keyFee: string }) {
    console.log({ flightFromChild: flight })
    console.log({ keyFee })
    this.selectedCostKeyReturn = keyFee as ESelectedCostKey;
    this.tarifaReturn = this.getTarifa(keyFee);
    this.flightReturn = flight;
    this.showTableFlight = false;
    if (this.flightReturn && this.selectedCostKeyReturn in this.flightReturn) {
      this.priceReturn = this.flightReturn[this.selectedCostKeyReturn];
    }
  }
  rounderByTwoDecimals(value: number): number {
    return parseFloat(value.toFixed(2))
  }

  handleSetClients() {
    // if (this.totalPassengers <= 0) return this.router.navigate(['/home']);
    this.router.navigate(['/clients_detail'])
    return
  }



  getDuration(departure: string, arrival: string): string {
    const departureDate = new Date(departure);
    const arrivalDate = new Date(arrival);
    const diff = arrivalDate.getTime() - departureDate.getTime();
    const hours = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor(diff / 1000 / 60) - (hours * 60);
    return `${hours}h ${minutes}m`;
  }
  handleSelectSeat(seat: Seat) {

    if (this.setSelectedSeats.has(seat)) {
      this.setSelectedSeats.delete(seat);
      this.totalPassengers++;
    } else {
      if (this.totalPassengers <= 0) return;
      this.setSelectedSeats.add(seat);
      this.totalPassengers--;
    }
  }
  openModalSeats() {
    if (this.modalSeats) {
      this.modalSeats.nativeElement.showModal()
      if (this.flight === undefined) return;
      this.planeSeatsService.getSeatsByPlaneId(this.flight.plane_id).subscribe(seats => {
        console.log(seats);
        const orderedSeats = seats.sort((a, b) => {
          //ordenar de menor a mayor por tipo de asiento ejemplo A1>A2>A3>B1>B2>B3
          if (a.seat_type > b.seat_type) return 1;
          if (a.seat_type < b.seat_type) return -1;
          //ordenar de menor a mayor por numero de asiento ejemplo A1>B1>A2>B2>A3>B3
          if (a.seat_number > b.seat_number) return 1;
          if (a.seat_number < b.seat_number) return -1;
          return 0;
        });
        this.seats = orderedSeats;
      });
    }
  }
  closeModalSeats() {
    if (this.modalSeats) this.modalSeats.nativeElement.close();
  }
  confirmSeats() {
    this.closeModalSeats();
  }
  confirmContact() {

  }

  closeModalContact() {
    if (this.contactDetail) this.contactDetail.nativeElement.close();
  }
  openModalContact() {
    if (this.contactDetail) this.contactDetail.nativeElement.showModal();
  }
}
