import { Component } from '@angular/core';

@Component({
  selector: 'app-access-navbar',
  templateUrl: './access-navbar.component.html',
  styleUrls: ['./access-navbar.component.css']
})
export class AccessNavbarComponent {
  
  selectedOption: string = 'inicio';

  changeOption(option: string) {
    this.selectedOption = option;
  }
}
