import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-no-found',
  templateUrl: './page-no-found.component.html',
  styleUrls: ['./page-no-found.component.css']
})
export class PageNoFoundComponent implements OnInit{
  constructor() { }
  imagenAleatoria = '';
  imagenes:any[]=['../../assets/imagenes/page-not-found.jpg'];
  ngOnInit(){
   this.obtenerImagen();
  }
  
  obtenerImagen(){
    const index = this.obtenerIndex(0, this.imagenes.length-1);
    this.imagenAleatoria = this.imagenes[index]
  }
  
  obtenerIndex(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
