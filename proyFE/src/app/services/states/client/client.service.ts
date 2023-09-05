import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from '../flight/flight-state.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private selectedClientsSubject: BehaviorSubject<Client[] | undefined> = new BehaviorSubject<Client[] | undefined>(undefined);
  public selectedClients$: Observable<Client[] | undefined> = this.selectedClientsSubject.asObservable();
  constructor() { }

  setSelectedClients(clients: Client[]) {
    this.selectedClientsSubject.next(clients);
  }
  getSelectedClients(): Client[] | undefined {
    return this.selectedClientsSubject.value;
  }
  reset() {
    this.selectedClientsSubject.next(undefined);
  }

}
