import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DEFAULT_PASSENGERS, OPTIONS_TRIP } from 'src/app/constants/filters';
import { ICON_SORT_TYPE } from 'src/app/constants/global';
import { Column, ListAndCount } from 'src/app/model/global';
import { AirportsService, Destinations, comboItem } from 'src/app/services/airports/airports.service';
import { Flight, FlightsService } from 'src/app/services/flights/flights.service';
import { BlockGUIService } from 'src/app/services/gui/blockGUI/block-gui.service';
import { MessagesService } from 'src/app/services/gui/messages/messages.service';
import { FlightStateService } from 'src/app/services/states/flight/flight-state.service';
import { Router } from '@angular/router';
import { FILTER_MESSAGES } from 'src/app/constants/messages';
import { Passengers } from 'src/app/model/passengers';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {

  @ViewChild('modalPassengers') modalPassengers: ElementRef | undefined;

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
          // if (this.destinationOptions.length > 0) {
          //   this.selectedDestination = this.destinationOptions[0];
          //   this.selectedOrigin = this.destinationOptions[0];
          // }
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
  selectedFromDate: Date | undefined;
  selectedToDate: Date | undefined;

  tripOptions: comboItem[] = [];
  destinationOptions: comboItem[] = [];

  selectedTrip: comboItem | undefined;
  selectedDestination: comboItem | undefined;
  selectedOrigin: comboItem | undefined;
  passengers: Passengers = DEFAULT_PASSENGERS;

  // new_detail: number = Math.floor(Math.random() * 1000);

  // params for table
  columns: Column[] = [];

  listAndCountFlights: ListAndCount<Flight> | undefined;
  selectedFlight: Flight | undefined;

  openModalPassengers() {
    // this.messagesService.showMessageWithContent({ severity: 'info', summary: 'Alerta', detail: 'Funcionalidad no implementada' })
    if (this.modalPassengers) this.modalPassengers.nativeElement.showModal();
  }
  closeModalPassengers() {
    // this.messagesService.showMessageWithContent({ severity: 'info', summary: 'Alerta', detail: 'Funcionalidad no implementada' })

    if (this.modalPassengers) this.modalPassengers.nativeElement.close();
  }
  confirmPassengers(){
    this.closeModalPassengers();
  }

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


  getValidSelectorByUUID(uuid: string): string {
    const modifiedId = uuid.replace(/-/g, '');
    console.log({ modifiedId })
    return `CODE${modifiedId}`;
  }

  searchFlights(params: any = null) {
    if (this.selectedTrip === undefined || this.selectedTrip === null) {
      this.messagesService.showMessageWithContent({ severity: 'info', summary: 'Alerta', detail: FILTER_MESSAGES.SELECT_TYPE_TRIP })
      return;
    }
    if (this.selectedDestination === undefined || this.selectedDestination === null) {
      this.messagesService.showMessageWithContent({ severity: 'info', summary: 'Alerta', detail: FILTER_MESSAGES.SELECT_DESTINATION })
      return;
    }


    if (this.selectedFromDate === undefined || this.selectedFromDate === null) {
      this.messagesService.showMessageWithContent({ severity: 'info', summary: 'Alerta', detail: FILTER_MESSAGES.SELECT_FROM_DATE })
      return;
    }

    if (this.selectedOrigin === undefined || this.selectedOrigin === null) {
      this.messagesService.showMessageWithContent({ severity: 'info', summary: 'Alerta', detail: FILTER_MESSAGES.SELECT_ORIGIN })
      return;
    }
    if (this.selectedOrigin.code == this.selectedDestination.code) {
      this.messagesService.showMessageWithContent({ severity: 'info', summary: 'Alerta', detail: FILTER_MESSAGES.ORIGIN_DESTINATION_NOT_SAME })
      return;
    }


    if (this.selectedTrip && this.selectedTrip.code == OPTIONS_TRIP.ROUND_TRIP) {
      if (this.selectedToDate === undefined || this.selectedToDate === null) {
        this.messagesService.showMessageWithContent({ severity: 'info', summary: 'Alerta', detail: FILTER_MESSAGES.SELECT_TO_DATE })
        return;
      }
      if (this.selectedFromDate.getTime() >= this.selectedToDate.getTime()) {
        this.messagesService.showMessageWithContent({ severity: 'info', summary: 'Alerta', detail: FILTER_MESSAGES.FROM_DATE_NOT_MINOR_OR_EQUAL_TO_DATE })
        return;
      }
    }

    this.block();
    this.listAndCountFlights = undefined;
    this.flightsService.searchFlights({ skip: 0, limit: 100, dateFrom: this.selectedFromDate, dateTo: this.selectedTrip.code === OPTIONS_TRIP.ROUND_TRIP ? this.selectedToDate : undefined, destination: this.selectedDestination.code, origin: this.selectedOrigin.code }).subscribe(
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
