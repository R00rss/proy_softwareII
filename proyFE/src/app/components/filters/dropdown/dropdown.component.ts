import { Component, Input, OnInit } from '@angular/core';
import { comboItem } from 'src/app/services/airports/airports.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  // get options from parent component
  @Input() options: comboItem[] = [];
  // get selected option from parent component
  @Input() selected: comboItem | undefined;
  // get label from parent component
  @Input() label: string | undefined;
  // get optionLabel from parent component
  @Input() optionLabel: string | undefined;

  constructor() { }

  ngOnInit(): void {
    console.log({ options: this.options, selected: this.selected, label: this.label, optionLabel: this.optionLabel })
  }

}
