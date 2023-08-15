import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-vuelo',
  templateUrl: './detalle-vuelo.component.html',
  styleUrls: ['./detalle-vuelo.component.css']
})
export class DetalleVueloComponent  {

  tipoVuelo: string = 'idaVuelta'; // Supongamos que "idaVuelta" es el valor predeterminado
    
  // Ejemplo:
  // Detalles de ida
  origenIda: string = 'UIO';
  destinoIda: string = 'GYE';
  fechaVueloIda: string = '2023-08-20';
  horaSalidaIda: string = '08:00 AM';
  horaLlegadaIda: string = '10:00 AM';
  numeroAvionIda: string = 'ABC123';
  tipoClaseIda: string = 'Económica';
  costoBoletoIda: number = 150.00;

  // Detalles de vuelta
  origenVuelta: string = 'GYE';
  destinoVuelta: string = 'UIO';
  fechaVueloVuelta: string = '2023-08-25';
  horaSalidaVuelta: string = '02:00 PM';
  horaLlegadaVuelta: string = '04:00 PM';
  numeroAvionVuelta: string = 'XYZ789';
  tipoClaseVuelta: string = 'Primera Clase';
  costoBoletoVuelta: number = 250.00;


  totalReserva: number = 400.00; // Ejemplo de total, reemplaza con tu lógica real
  
}
