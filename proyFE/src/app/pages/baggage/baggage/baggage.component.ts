import { Component } from '@angular/core';
import { PassengerInfo } from 'src/app/model/passengers';
import { PassengersService } from 'src/app/services/states/passengers/passengers.service';

interface PassengerInfoBaggage extends PassengerInfo {
  numBaggage: number,
  priceBaggage: number
}

@Component({
  selector: 'app-baggage',
  templateUrl: './baggage.component.html',
  styleUrls: ['./baggage.component.css']
})
export class BaggageComponent {
  passengers: PassengerInfoBaggage[] = []
  passengerSelected: PassengerInfoBaggage;
  value18: number = 0
  constructor(passengersService: PassengersService) {
    const DEFAULT_PASSENGERS: PassengerInfoBaggage[] = [
      {
        lastName: 'Perez',
        name: 'Juan',
        passport: '12345678',
        type: 'old',
        birdDate: new Date(1990, 1, 1),
        numBaggage: 0,
        priceBaggage: 15.00
      }, {
        lastName: 'Garcia',
        name: 'Ronny',
        passport: '123123123',
        type: 'adults',
        numBaggage: 0,
        priceBaggage: 15.00
      }
    ]
    const passengers = passengersService.getSelectedPassenger();
    if (passengers.length === 0) {
      this.passengers = DEFAULT_PASSENGERS;
    } else {
      this.passengers = passengers.map(passenger => {
        return {
          ...passenger,
          numBaggage: 0,
          priceBaggage: 15.00
        } as PassengerInfoBaggage
      })
    }
    this.passengerSelected = this.passengers[0];
    console.log(this.passengers);
  }
  handleChangePassenger(passenger: PassengerInfoBaggage) {
    this.passengerSelected = passenger;
  }
  handleChangeBaggage(numBaggage: number) {

  }

}
