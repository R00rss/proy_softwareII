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

@NgModule({
  declarations: [
    AppComponent,
    PageNoFoundComponent,
    PaginaPrincipalComponent,
    CabeceraComponent,
    CarouselComponent,
    CentroComponent,
    PieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
