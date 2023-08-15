import { Injectable } from '@angular/core';
import { DetalleVuelo } from '../../models/DetalleVuelo';

@Injectable({
  providedIn: 'root'
})
export class FlightBookingService {

  private detalle: DetalleVuelo = {
    horaSalida: '',
    horaLlegada: '',
    origen: '',
    destino: '',
    valorClaseTurista: 0,
    valorPrimerClase: 0,
    claseVuelo: '',
    fechaVuelo: ''
  };

  constructor() { }

  guardarHoras(horaSalida: string, horaLlegada: string) {
    this.detalle.horaSalida = horaSalida;
    this.detalle.horaLlegada = horaLlegada;
  }

  guardarOrigenDestino(origen: string, destino: string) {
    this.detalle.origen = origen;
    this.detalle.destino = destino;
  }

  guardarValorClaseTurista(valor: number) {
    this.detalle.valorClaseTurista = valor;
  }

  guardarValorPrimerClase(valor: number) {
    this.detalle.valorPrimerClase = valor;
  }

  guardarClaseVuelo(clase: string) {
    this.detalle.claseVuelo = clase;
  }

  guardarFechaVuelo(fecha: string) {
    this.detalle.fechaVuelo = fecha;
  }
  
  guardarDetalleCompleto(detalle: DetalleVuelo) {
    this.detalle = { ...this.detalle, ...detalle };
  }

  obtenerDetalle() {
    return this.detalle;
  }
}
