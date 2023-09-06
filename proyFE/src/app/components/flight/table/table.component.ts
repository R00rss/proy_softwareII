import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ListAndCount } from 'src/app/model/global';
import { Flight, FlightsService } from 'src/app/services/flights/flights.service';
import { BlockGUIService } from 'src/app/services/gui/blockGUI/block-gui.service';
import { FilterStateService, Filters } from 'src/app/services/states/filter/filter-state.service';
import { FlightStateService } from 'src/app/services/states/flight/flight-state.service';

interface FlightAndKeyFee {
  flight: Flight;
  keyFee: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() listAndCountFlights: ListAndCount<Flight> | undefined;
  @Input() filters: Filters | undefined;
  @Input() roundTrip: boolean = false;
  @Output() flightSelectToParent: EventEmitter<FlightAndKeyFee> = new EventEmitter<FlightAndKeyFee>();
  selectedFilter: string = 'direct';
  setOpened: Set<string> = new Set();
  selectedFlight: Flight | undefined;


  constructor(
    private blockGUIService: BlockGUIService,
    private flightStateService: FlightStateService,
    private filterStateService: FilterStateService,
    private flightsService: FlightsService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log("ngOnInit de table component")
    console.log(this.filters)
    if (this.filters === undefined) {
      if (this.roundTrip === true) {
        this.filters = this.filterStateService.getFiltersReturnSelected()
      } else {
        this.filters = this.filterStateService.getFiltersSelected();
      }
      console.log(this.filters)
      if (this.filters) this.getFlights(this.filters);
    } else {
      this.getFlights(this.filters);
    }
  }

  getFlights(filters: Filters) {
    this.block();
    this.listAndCountFlights = undefined;
    this.flightsService.searchFlights(
      {
        skip: 0, limit: 100, dateFrom: new Date(filters.dateFrom), dateTo: filters.dateTo ? new Date(filters.dateTo) : undefined, destination: filters.destination, origin: filters.origin, passengers: {
          adults: filters.adults,
          children: filters.children,
          infants: filters.infants,
          old: filters.old
        }
      }
    ).subscribe({
      next: (listAndCountFlights) => {
        console.log({ listAndCountFlights })
        this.listAndCountFlights = listAndCountFlights;
      },
      complete: () => {
        this.unblock()
      },
      error: (err) => console.error({ err })
    })
  }


  formatDateToString(date: Date): string {
    return formatDate(date, 'EEE, d MMM, y', 'es');
  }
  handleClicFlight(flight: Flight) {
    if (this.setOpened.has(flight.id)) {
      this.setOpened.delete(flight.id);
    } else {
      this.setOpened.add(flight.id);
    }
  }
  getValidSelectorByUUID(uuid: string): string {
    const modifiedId = uuid.replace(/-/g, '');
    // console.log({ modifiedId })
    return `CODE${modifiedId}`;
  }
  getDuration(departure: string, arrival: string): string {
    const departureDate = new Date(departure);
    const arrivalDate = new Date(arrival);
    const diff = arrivalDate.getTime() - departureDate.getTime();
    const hours = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor(diff / 1000 / 60) - (hours * 60);
    return `${hours}h ${minutes}m`;
  }
  sendFlightToParent({ flight, keyFee }: { flight: Flight, keyFee: string }) {
    if (this.flightSelectToParent)
      this.flightSelectToParent.emit({ flight, keyFee });
  }

  block() {
    this.blockGUIService.blockGUI();
  }
  unblock() {
    this.blockGUIService.unblockGUI();
  }

  flightSelect(flight: Flight, selectedCostKey: string) {
    this.block();
    this.selectedFlight = flight;
    if (this.roundTrip === true) {
      this.flightStateService.setSelectedFlightReturn(this.selectedFlight);
      this.sendFlightToParent({flight: this.selectedFlight, keyFee: selectedCostKey});
      setTimeout(() => {
        this.unblock();
      }, 1000);
    } else {
      this.flightStateService.setSelectedFlight(this.selectedFlight);
      console.log({ filters: this.filters })
      if (this.filters) this.filterStateService.setFiltersSelected(this.filters);
      setTimeout(() => {
        this.router.navigate(['/flight_detail/' + selectedCostKey])
        this.unblock();
      }, 1000);
    }


  }

  handleFilter(option: string) {
    console.log({ option })
    if (option === 'direct') {
      this.selectedFilter = 'direct';
      if (!this.listAndCountFlights) return
      this.listAndCountFlights.data.sort((a, b) => {
        if (a.direct && !b.direct) {
          return -1; // a va primero si es directo y b no lo es
        } else if (!a.direct && b.direct) {
          return 1; // b va primero si es directo y a no lo es
        }
        return 0; // si ambos son iguales en cuanto a la directividad
      });
    }
    if (option === 'cheapest') {
      this.selectedFilter = 'cheapest'; if (!this.listAndCountFlights) return
      this.listAndCountFlights.data.sort((a, b) => {
        return a.cost - b.cost;
      })
    }
    if (option === 'all') {
      this.selectedFilter = 'all';
      if (!this.listAndCountFlights) return
      this.listAndCountFlights.data.sort((a, b) => {
        return a.departure.localeCompare(b.departure);
      }
      )
    }
  }

}
