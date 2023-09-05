import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/states/client/client.service';
import { Client } from 'src/app/services/states/flight/flight-state.service';



@Component({
  selector: 'app-clients-detail',
  templateUrl: './clients-detail.component.html',
  styleUrls: ['./clients-detail.component.css']
})
export class ClientsDetailComponent implements OnInit {
  clients: Client[] = [];
  constructor(private clientService: ClientService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    const clients = this.clientService.getSelectedClients();
    if (!clients) return;
    this.clients = clients;
    this.route.params.subscribe(params => {
      console.log({ params })
    });


  }

  selectedName = ""
}
