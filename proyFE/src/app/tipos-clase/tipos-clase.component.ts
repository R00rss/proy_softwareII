import { Component, OnInit } from '@angular/core';
import { FlightBookingService } from '../services/flight-booking.service';
import { DetalleVuelo } from '../models/DetalleVuelo';

@Component({
  selector: 'app-tipos-clase',
  templateUrl: './tipos-clase.component.html',
  styleUrls: ['./tipos-clase.component.css']
})
export class TiposClaseComponent implements OnInit{

  detalleVuelo!: DetalleVuelo;
  precioPrimeraClase!: number;
  precioClaseTurista!: number;


  constructor(
    private FlightsService: FlightBookingService,
  ) { }

  ngOnInit(): void {
    this.FlightsService.guardarValorPrimerClase(95.67);
    this.FlightsService.guardarValorClaseTurista(56.47);

    console.log(this.FlightsService.obtenerDetalle());

    this.obtenerPrecioPrimeraClase();
    this.obtenerPrecioClaseTurista();
  }

  obtenerDetalleVuelo(): DetalleVuelo{
    this.detalleVuelo = this.FlightsService.obtenerDetalle();
    return this.detalleVuelo;
  }

  obtenerPrecioPrimeraClase(){
    this.precioPrimeraClase = this.obtenerDetalleVuelo().valorPrimerClase;
  }

  obtenerPrecioClaseTurista(){
    this.precioClaseTurista = this.obtenerDetalleVuelo().valorClaseTurista;
  }

  guardarClaseVueloTurista(){
    const detalle = this.FlightsService.obtenerDetalle();
    this.FlightsService.guardarClaseVuelo('Clase turista');
    this.FlightsService.guardarDetalleCompleto(detalle);
    console.log(this.FlightsService.obtenerDetalle());
  }

  guardarClaseVueloPrimera(){
    const detalle = this.FlightsService.obtenerDetalle();
    this.FlightsService.guardarClaseVuelo('Primera clase');
    this.FlightsService.guardarDetalleCompleto(detalle);
    console.log(this.FlightsService.obtenerDetalle());
  }
}
