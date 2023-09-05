import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FlightDetailComponent } from './pages/flight-detail/flight-detail.component';
import { SearchDetailComponent } from './pages/search-detail/search-detail/search-detail.component';
import { ClientsDetailComponent } from './pages/clients_detail/clients-detail/clients-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'detalle_busqueda', component: SearchDetailComponent },
  { path: 'search_detail', component: SearchDetailComponent },
  { path: 'flight_detail/:selectedCostKey', component: FlightDetailComponent },
  { path: 'detalle_vuelo/:selectedCostKey', component: FlightDetailComponent },
  { path: 'clients_detail', component: ClientsDetailComponent },
  // { path: 'flightDetail', component: FlightDetailComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
