import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PassengerInfo, PassengerType, Passengers } from 'src/app/model/passengers';
import { ClientService } from 'src/app/services/states/client/client.service';
import { FilterStateService, Filters } from 'src/app/services/states/filter/filter-state.service';
import { Client, FlightStateService } from 'src/app/services/states/flight/flight-state.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PassengersService } from 'src/app/services/states/passengers/passengers.service';

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
    private fb: FormBuilder,
    private passengersService: PassengersService,
    private router: Router
  ) {
    const currentDate = new Date();
    this.minDate = new Date(currentDate.getFullYear() - 65, currentDate.getMonth(), currentDate.getDate());
    this.maxDate = currentDate;

    const filters = this.filterStateService.getFiltersSelected();
    if (filters) {
      this.filterStateService.reset();

      // const DEFAULT_FILTERS: Filters = {
      //   trip: 'one-way',
      //   origin: 'BUE',
      //   destination: 'MIA',
      //   dateFrom: new Date(),
      //   dateTo: undefined,
      //   old: 0,
      //   infants: 0,
      //   children: 0,
      //   adults: 1,
      // }


      this.passengersInfo = this.mapNumberToPassengers(filters);
      // this.passengersInfo = this.mapNumberToPassengers(DEFAULT_FILTERS);


      this.passengersForm = this.fb.group({});
      this.passengersInfo.forEach((passenger, i) => {
        const passengerName = passenger.type + '_name_' + i;
        const passengerLastName = passenger.type + '_lastName_' + i;
        const passengerPassport = passenger.type + '_passport_' + i;
        if (passenger.type === 'infants' || passenger.type === 'old') {
          const passengerBirdDate = passenger.type + '_birdDate_' + i;
          this.passengersForm.addControl(passengerBirdDate, this.fb.control('', Validators.required));
        }
        this.passengersForm.addControl(passengerName, this.fb.control('', Validators.required));
        this.passengersForm.addControl(passengerLastName, this.fb.control('', Validators.required));
        // this.passengersForm.addControl(passengerPassport, this.fb.control('', Validators.required));
        this.passengersForm.addControl(passengerPassport, this.fb.control('', [Validators.required, Validators.pattern(/^[A-Z0-9]{8}$/)]));

      });
      this.passengersForm.addControl('client_tel', this.fb.control('', Validators.required));
      this.passengersForm.addControl('client_email', this.fb.control('', Validators.required));
    }else{
      this.passengersForm = this.fb.group({});
    }
  }

  isValidPassportNumber(passportNumber: string): boolean {
    // Aquí puedes implementar tu lógica de validación, por ejemplo, usando una expresión regular
    const passportRegex = /^[A-Z0-9]{8}$/; // Un ejemplo simple para pasaportes de 8 caracteres
    return passportRegex.test(passportNumber);
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

    this.isRoundTrip = flightReturn === undefined ? false : true;
  }
  handleSubmit() {
    console.log("handleSubmit")
    if (this.passengersForm.valid) {
      console.log('Formulario válido');
      const passengersInfo = this.mapFormToPassengers(this.passengersForm);
      this.passengersService.setSelectedPassenger(passengersInfo);
      console.log("Passengers:", this.passengersForm)
      console.log("passengersInfo: ", passengersInfo)
      this.router.navigate(['/seats_detail']);
    } else {
      console.log('Formulario no válido');
    }

  }
  mapFormToPassengers(formGroup: FormGroup<any>): PassengerInfo[] {
    const passengersInfo: PassengerInfo[] = [];
    this.passengersInfo.forEach((passenger, i) => {
      const passengerName = passenger.type + '_name_' + i;
      const passengerLastName = passenger.type + '_lastName_' + i;
      const passengerPassport = passenger.type + '_passport_' + i;
      const passengerBirdDate = passenger.type + '_birdDate_' + i;
      passengersInfo.push({
        name: formGroup.get(passengerName)?.value,
        lastName: formGroup.get(passengerLastName)?.value,
        passport: formGroup.get(passengerPassport)?.value,
        type: passenger.type,
        birdDate: formGroup.get(passengerBirdDate)?.value,
      })
    });
    return passengersInfo;
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
