import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { OPTIONS_TRIP } from 'src/app/constants/filters';
import { ICON_SORT_TYPE } from 'src/app/constants/global';
import { Column, ListAndCount } from 'src/app/model/global';
import { AirportsService, Destinations, comboItem } from 'src/app/services/airports/airports.service';
import { Flight, FlightsService } from 'src/app/services/flights/flights.service';
import { BlockGUIService } from 'src/app/services/gui/blockGUI/block-gui.service';
import { MessagesService } from 'src/app/services/gui/messages/messages.service';
import { FlightStateService } from 'src/app/services/states/flight/flight-state.service';
import { Router } from '@angular/router';

interface NodeEvent {
  originalEvent: Event;
  node: TreeNode;
}

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {

  constructor(
    public airportsService: AirportsService,
    public flightsService: FlightsService,
    private blockGUIService: BlockGUIService,
    private messagesService: MessagesService,
    private flightStateService: FlightStateService,
    private router: Router
  ) { }
  destinations: Destinations[] = [];
  ngOnInit(): void {
    this.setColumns()
    this.airportsService.getDestinationsCombo().subscribe(
      {
        next: (destinationOptions) => {
          console.log({ destinationOptions })
          this.destinationOptions = destinationOptions;
          if (this.destinationOptions.length > 0) {
            this.selectedDestination = this.destinationOptions[0];
          }
        },
        complete: () => console.info('complete'),
        error: (err) => console.error({ err })
      }
    )
    this.airportsService.getOptionsTrip().subscribe(
      {
        next: (tripOptions) => {
          console.log({ tripOptions })
          this.tripOptions = tripOptions;
          if (this.tripOptions.length > 0) {
            this.selectedTrip = this.tripOptions[0];
          }
        },
        complete: () => console.info('complete'),
        error: (err) => console.error({ err })
      }
    )
  }


  OPTIONS_TRIP = OPTIONS_TRIP;
  selectedFromDate: Date = new Date();
  selectedToDate: Date = new Date();

  tripOptions: comboItem[] = [];
  destinationOptions: comboItem[] = [];

  selectedTrip: comboItem | undefined;
  selectedDestination: comboItem | undefined;
  selectedOrigin: comboItem | undefined;

  // new_detail: number = Math.floor(Math.random() * 1000);

  // params for table
  columns: Column[] = [];

  listAndCountFlights: ListAndCount<Flight> | undefined;
  selectedFlight: Flight | undefined;

  block() {
    this.blockGUIService.blockGUI();
  }

  unblock() {
    this.blockGUIService.unblockGUI();
  }

  setColumns() {
    this.columns = [
      { name: '', code: 'id', width: 5, icon: ICON_SORT_TYPE.NUMBER },
      { name: 'Desde', code: 'origin', width: 22, icon: ICON_SORT_TYPE.TEXT },
      { name: 'Hacia', code: 'destination', width: 22, icon: ICON_SORT_TYPE.TEXT },
      { name: 'Fecha de salida', code: 'departure', width: 22, icon: ICON_SORT_TYPE.DATE },
      { name: 'Fecha de llegada', code: 'arrival', width: 22, icon: ICON_SORT_TYPE.DATE },
    ]

  }
  flightSelect(flight: Flight) {
    this.block();
    this.selectedFlight = flight;
    this.flightStateService.setSelectedFlight(this.selectedFlight);
    setTimeout(() => {
      this.router.navigate(['/flight_detail/2000'])
      this.unblock();
    }, 1000);
  }
  flightUnselect(flight: Flight) {
    this.messagesService.showMessageWithContent({ severity: 'info', summary: 'Node Unselected', detail: 'test' })
  }
  isSelected(flight: Flight) {
    console.log({ flight })
    if (this.selectedFlight === undefined || this.selectedFlight === null) return false;
    return flight.id === this.selectedFlight.id;
  }


  searchFlights(params: any = null) {
    if (this.selectedTrip === undefined || this.selectedTrip === null) {
      this.messagesService.showMessageWithContent({ severity: 'error', summary: 'Error', detail: 'Seleccione un tipo de viaje' })
      return;
    }
    if (this.selectedDestination === undefined || this.selectedDestination === null) {
      this.messagesService.showMessageWithContent({ severity: 'error', summary: 'Error', detail: 'Seleccione un destino' })
      return;
    }
    if (this.selectedOrigin === undefined || this.selectedOrigin === null) {
      this.messagesService.showMessageWithContent({ severity: 'error', summary: 'Error', detail: 'Seleccione un Origen' })
      return;
    }
    if (this.selectedOrigin.code === this.selectedDestination.code) {
      this.messagesService.showMessageWithContent({ severity: 'error', summary: 'Error', detail: 'El origen y destino no pueden ser iguales' })
      return;
    }


    if (this.selectedTrip && this.selectedTrip.code === OPTIONS_TRIP.ROUND_TRIP) {
      if (this.selectedFromDate.getTime() >= this.selectedToDate.getTime()) {
        this.messagesService.showMessageWithContent({ severity: 'warn', summary: 'Alerta', detail: 'La fecha de salida debe ser menor a la fecha de llegada' })
        return;
      }
    }

    this.block();
    this.listAndCountFlights = undefined;
    this.flightsService.searchFlights({ skip: 0, limit: 100, dateFrom: this.selectedFromDate, dateTo: this.selectedTrip.code === OPTIONS_TRIP.ROUND_TRIP ? this.selectedToDate : undefined, destination: this.selectedDestination?.code, origin: this.selectedOrigin?.code }).subscribe(
      {
        next: (listAndCountFlights) => {
          console.log({ listAndCountFlights })
          this.listAndCountFlights = listAndCountFlights;
        },
        complete: () => {
          console.info('complete')
          this.unblock()
          this.messagesService.showMessageWithContent({ severity: 'success', summary: 'Éxito', detail: 'Búsqueda Finalizada' })
          // wait 1 seconds and hide message
          setTimeout(() => {
            this.messagesService.hideMessage()
          }, 2000);
        },
        error: (err) => console.error({ err })
      }
    )
  }
}
