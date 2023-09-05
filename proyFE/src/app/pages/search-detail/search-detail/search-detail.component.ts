import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICON_SORT_TYPE } from 'src/app/constants/global';
import { Column, ListAndCount } from 'src/app/model/global';
import { Flight, FlightsService } from 'src/app/services/flights/flights.service';
import { BlockGUIService } from 'src/app/services/gui/blockGUI/block-gui.service';
import { MessagesService } from 'src/app/services/gui/messages/messages.service';
import { FilterStateService, Filters } from 'src/app/services/states/filter/filter-state.service';
import { FlightStateService } from 'src/app/services/states/flight/flight-state.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-search-detail',
  templateUrl: './search-detail.component.html',
  styleUrls: ['./search-detail.component.css']
})
export class SearchDetailComponent implements OnInit {

  columns: Column[] = [];
  listAndCountFlights: ListAndCount<Flight> | undefined;
  selectedFlight: Flight | undefined;
  filters: Filters | undefined;
  selectedFilter: string = 'direct';
  setOpened: Set<string> = new Set();

  constructor(
    private route: ActivatedRoute,
    private blockGUIService: BlockGUIService,
    private flightStateService: FlightStateService,
    private filterStateService: FilterStateService,
    public flightsService: FlightsService,
    private messagesService: MessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.setColumns();
    this.searchFlights();
  }
  searchFlights() {
    this.route.queryParams.subscribe(params => {
      console.log({ params })
      this.filters = params as Filters;
      if (!this.filters) return
      this.filterStateService.setFiltersSelected(this.filters);
      this.getFlights(this.filters);
    });
  }
  
  handleClicFlight(flight: Flight) {
    if (this.setOpened.has(flight.id)) {
      this.setOpened.delete(flight.id);
    } else {
      this.setOpened.add(flight.id);
    }
  }




  formatDateToString(date: Date): string {
    return formatDate(date, 'EEE, d MMM, y', 'es');
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
        console.info('complete')
        this.unblock()
        this.messagesService.showMessageWithContent({ severity: 'success', summary: 'Éxito', detail: 'Búsqueda Finalizada' })
        setTimeout(() => {
          this.messagesService.hideMessage()
        }, 2000);
      },
      error: (err) => console.error({ err })
    })
  }
  getDuration(departure: string, arrival: string): string {
    const departureDate = new Date(departure);
    const arrivalDate = new Date(arrival);
    const diff = arrivalDate.getTime() - departureDate.getTime();
    const hours = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor(diff / 1000 / 60) - (hours * 60);
    return `${hours}h ${minutes}m`;
  }

  setColumns() {
    this.columns = [
      { name: '', code: 'id', width: 5, icon: ICON_SORT_TYPE.NUMBER },
      { name: 'Desde', code: 'origin', width: 22, icon: ICON_SORT_TYPE.TEXT },
      { name: 'Hacia', code: 'destination', width: 22, icon: ICON_SORT_TYPE.TEXT },
      { name: 'Fecha de salida', code: 'departure', width: 22, icon: ICON_SORT_TYPE.DATE },
      { name: 'Fecha de llegada', code: 'arrival', width: 22, icon: ICON_SORT_TYPE.DATE },
      { name: 'Precio', code: 'price', width: 7, icon: ICON_SORT_TYPE.NUMBER },
    ]
  }
  getValidSelectorByUUID(uuid: string): string {
    const modifiedId = uuid.replace(/-/g, '');
    console.log({ modifiedId })
    return `CODE${modifiedId}`;
  }

  block() {
    this.blockGUIService.blockGUI();
  }
  unblock() {
    this.blockGUIService.unblockGUI();
  }
}
