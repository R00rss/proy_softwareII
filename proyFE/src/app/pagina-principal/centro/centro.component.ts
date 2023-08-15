import { Component } from '@angular/core';
import { MatDatepickerInputEvent, DateFilterFn } from '@angular/material/datepicker';

@Component({
  selector: 'app-centro',
  templateUrl: './centro.component.html',
  styleUrls: ['./centro.component.css']
})
export class CentroComponent {
  selectedTripType: string = 'idaVuelta';

  constructor() {}

  validateDepartureDate(event: MatDatepickerInputEvent<Date>): void {
    const selectedDate = event.value;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate && selectedDate < today) {
      event.target.value = null; // Set the input value to null to clear the selected date
      // Handle the validation error, e.g., show an error message
    }
  }

  validateReturnDate(event: MatDatepickerInputEvent<Date>): void {
    if (this.selectedTripType === 'idaVuelta') {
      const selectedDate = event.value;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
      if (selectedDate && selectedDate < today) {
        event.target.value = null; // Set the input value to null to clear the selected date
        // Handle the validation error, e.g., show an error message
      }
    }
  }
  

  isDateSelectable: DateFilterFn<Date | null> = (date: Date | null): boolean => {
    if (!date) {
      return false;
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };
  selectedPassengerType: string = 'adulto'; // Tipo de pasajero por defecto
  passengerTypes = [
    { name: 'Bebé (menores de 2 años)', value: 'bebe' },
    { name: 'Jóvenes (entre 2 y 25 años)', value: 'jovenes' },
    { name: 'Adulto (entre 25 y 65 años)', value: 'adulto' },
    { name: 'Adulto mayor (mayores de 65 años)', value: 'adultoMayor' }
  ];
  passengers: { [key: string]: number } = {
    'bebe': 0,
    'jovenes': 0,
    'adulto': 1, // Por defecto, 1 adulto
    'adultoMayor': 0
  };
  incrementPassengerCount(type: string): void {
    this.passengers[type]++;
  }
  
  decrementPassengerCount(type: string): void {
    if (this.passengers[type] > 0) {
      this.passengers[type]--;
    }
  }
  showPassengerTypes: boolean = false; // Por defecto, no mostrar

  togglePassengerTypes(): void {
    this.showPassengerTypes = !this.showPassengerTypes;
}
  
}
