import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FlightDetailComponent } from './pages/flight-detail/flight-detail.component';
import { SearchDetailComponent } from './pages/search-detail/search-detail/search-detail.component';
import { ClientsDetailComponent } from './pages/clients_detail/clients-detail/clients-detail.component';
import { SeatsDetailComponent } from './pages/seats-detail/seats-detail/seats-detail.component';
import { PaymentComponent } from './pages/payment/payment/payment.component';
import { FlightsListComponent } from './pages/admin/flights-list/flights-list.component';
import { PerfilComponent } from './pages/admin/perfil/perfil.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { FlightCreateComponent } from './pages/admin/flight-create/flight-create.component';
import { EditFlightComponent } from './pages/admin/edit-flight/edit-flight.component';
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
  { path: 'administration', component: FlightsListComponent, canActivate: [AuthGuard]},
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard]},
  { path: 'flightCreate', component: FlightCreateComponent, canActivate: [AuthGuard]},
  { path: 'flightEdit', component: EditFlightComponent, canActivate: [AuthGuard]},
  { path: 'flightSearch', component: SearchDetailComponent, canActivate: [AuthGuard]},

  // { path: 'flightDetail', component: FlightDetailComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
