import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PassengerInfo, PassengerType, Passengers } from 'src/app/model/passengers';
import { ClientService } from 'src/app/services/states/client/client.service';
import { FilterStateService, Filters } from 'src/app/services/states/filter/filter-state.service';
import { Client, FlightStateService } from 'src/app/services/states/flight/flight-state.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-clients-detail',
  templateUrl: './clients-detail.component.html',
  styleUrls: ['./clients-detail.component.css']
})
export class ClientsDetailComponent implements OnInit {
  passengersForm: FormGroup;
  clients: Client[] = [];
  isRoundTrip: boolean = false;
  adults: number = 0;
  children: number = 0;
  infants: number = 0;
  old: number = 0;
  passengersInfo: PassengerInfo[] = [];
  clientInfo: Client | undefined;
  activeIndex: number = 0;
  minDate: Date;
  maxDate: Date;
  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private flightStateService: FlightStateService,
    private filterStateService: FilterStateService,
    private fb: FormBuilder
  ) {
    const currentDate = new Date();
    this.minDate = new Date(currentDate.getFullYear() - 65, currentDate.getMonth(), currentDate.getDate());
    this.maxDate = currentDate;

    this.passengersForm = this.fb.group({});
    const auxArray = Array(25).fill(0).map((_, i) => i);
    auxArray.forEach((index) => {
      const passengerName = 'passengerName_' + index;
      const passengerLastName = 'passengerLastName_' + index;
      const passengerPassport = 'passengerPassport_' + index;
      const passengerBirdDate = 'passengerBirdDate_' + index;
      this.passengersForm.addControl(passengerName, this.fb.control('', Validators.required));
      this.passengersForm.addControl(passengerLastName, this.fb.control('', Validators.required));
      this.passengersForm.addControl(passengerPassport, this.fb.control('', Validators.required));
      this.passengersForm.addControl(passengerBirdDate, this.fb.control('', Validators.required));
    });
  }

  submitForm() {
    if (this.passengersForm.valid) {
      // Todos los campos están llenos y válidos, puedes continuar con el procesamiento.
      console.log('Formulario válido');
    } else {
      // Algunos campos no están llenos o no son válidos, muestra un mensaje de error o toma otra acción apropiada.
      console.log('Formulario no válido');
    }
  }

  ngOnInit(): void {
    console.log("ngOnInit de clients-detail")


    const flight = this.flightStateService.getSelectedFlight();
    const flightReturn = this.flightStateService.getSelectedFlightReturn();
    const filters = this.filterStateService.getFiltersSelected();
    console.log({ flight })
    console.log({ flightReturn })
    console.log({ filters })
    if (flight === undefined) {
      this.flightStateService.reset();
    }
    if (flightReturn === undefined) {
      this.flightStateService.resetReturn();
    }
    if (filters === undefined) {
      this.filterStateService.reset();
      // return
    }
    const DEFAULT_FILTERS: Filters = {
      trip: 'one-way',
      origin: 'BUE',
      destination: 'MIA',
      dateFrom: new Date(),
      dateTo: undefined,
      old: 3,
      infants: 0,
      children: 0,
      adults: 1,
    }


    this.isRoundTrip = flightReturn === undefined ? false : true;
    // this.passengersInfo = this.mapNumberToPassengers(filters);
    this.passengersInfo = this.mapNumberToPassengers(DEFAULT_FILTERS);
    console.log("passengersInfo: ", this.passengersInfo)
  }

  mapNumberToPassengers(filters: Filters): PassengerInfo[] {
    const listOfTypes: string[] = []
    const passengersInfo: PassengerInfo[] = []
    for (let i = 0; i < filters.adults; i++) {
      listOfTypes.push('adults')
    }
    for (let i = 0; i < filters.children; i++) {
      listOfTypes.push('children')
    }
    for (let i = 0; i < filters.infants; i++) {
      listOfTypes.push('infants')
    }
    for (let i = 0; i < filters.old; i++) {
      listOfTypes.push('old')
    }
    listOfTypes.forEach((type) => {
      passengersInfo.push({
        name: '',
        lastName: '',
        passport: '',
        type: type as PassengerType
      })
    })
    return passengersInfo;

  }
}
