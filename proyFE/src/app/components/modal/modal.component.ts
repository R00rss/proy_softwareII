import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit{
  @Input() amount: any;
  @Input() items: any;
  @Output() closeModal = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
