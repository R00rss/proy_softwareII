import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FlightDetailComponent } from './pages/flight-detail/flight-detail.component';
import { SearchDetailComponent } from './pages/search-detail/search-detail/search-detail.component';
import { ClientsDetailComponent } from './pages/clients_detail/clients-detail/clients-detail.component';
import { SeatsDetailComponent } from './pages/seats-detail/seats-detail/seats-detail.component';
import { PaymentComponent } from './pages/payment/payment/payment.component';
import { BaggageComponent } from './pages/baggage/baggage/baggage.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'detalle_busqueda', component: SearchDetailComponent },
  { path: 'search_detail', component: SearchDetailComponent },
  { path: 'flight_detail/:selectedCostKey', component: FlightDetailComponent },
  { path: 'detalle_vuelo/:selectedCostKey', component: FlightDetailComponent },
  { path: 'clients_detail', component: ClientsDetailComponent },
  { path: 'seats_detail', component: SeatsDetailComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'baggage', component: BaggageComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
