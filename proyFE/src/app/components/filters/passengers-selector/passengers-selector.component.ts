import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-passengers-selector',
  templateUrl: './passengers-selector.component.html',
  styleUrls: ['./passengers-selector.component.css']
})
export class PassengersSelectorComponent {
  @Input() passengers: any[];
  @Output() passengersChange = new EventEmitter<any[]>();
  constructor() { 
    this.passengers = [];
  }


}
