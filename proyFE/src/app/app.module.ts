import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNoFoundComponent } from './page-no-found/page-no-found.component';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { CabeceraComponent } from './pagina-principal/cabecera/cabecera.component';
import { CarouselComponent } from './pagina-principal/carousel/carousel.component';
import { CentroComponent } from './pagina-principal/centro/centro.component';
import { PieComponent } from './pagina-principal/pie/pie.component';
import { DetalleVueloComponent } from './detalle-vuelo/detalle-vuelo.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { MatRadioModule } from '@angular/material/radio'; // Importa MatRadioModule
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    AppComponent,
    PageNoFoundComponent,
    PaginaPrincipalComponent,
    CabeceraComponent,
    CarouselComponent,
    CentroComponent,
    PieComponent,
    DetalleVueloComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    FormsModule, 
    MatRadioModule, 
    MatCheckboxModule, 
    MatIconModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
