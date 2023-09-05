import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OPTIONS_TRIP } from 'src/app/constants/filters';
import { Passengers } from 'src/app/model/passengers';

export interface Filters {
  trip: string;
  origin: string;
  destination: string;
  dateFrom: Date;
  dateTo?: Date;
  old: number;
  infants: number;
  children: number;
  adults: number;
}

@Injectable({
  providedIn: 'root'
})
export class FilterStateService {
  private filtersSelected: BehaviorSubject<Filters | undefined> = new BehaviorSubject<Filters | undefined>(undefined);
  public filtersSelected$ = this.filtersSelected.asObservable();
  constructor() { }
  setFiltersSelected(filters: Filters) {
    this.filtersSelected.next(filters);
  }
  getFiltersSelected(): Filters | undefined {
    return this.filtersSelected.value;
  }
  getFiltersReturnSelected(): Filters | undefined {
    if (this.filtersSelected.value) {
      const prevFilters = this.filtersSelected.value;
      const { origin, destination, dateTo } = prevFilters;
      const auxFilter: Filters = {
        ...prevFilters,
        trip: OPTIONS_TRIP.ONE_WAY,
        origin: destination,
        destination: origin,
        dateFrom: dateTo ? dateTo : new Date(),
        dateTo: undefined,
      }
      return auxFilter;
    }
    return undefined;
  }

  reset() {
    this.filtersSelected.next(undefined);
  }
}
