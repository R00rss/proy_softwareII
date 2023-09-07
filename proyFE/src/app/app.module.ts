import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import localeEs from '@angular/common/locales/es';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CarouselModule } from 'primeng/carousel';
import { FilterBarComponent } from './components/flight/filter-bar/filter-bar.component';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { DropdownComponent } from './components/filters/dropdown/dropdown.component';
import { FlightDetailComponent } from './pages/flight-detail/flight-detail.component';
import { BlockGUIComponent } from './components/block-gui/block-gui.component';
import { MessagesModule } from 'primeng/messages';
import { MessageComponent } from './components/message/message.component';
import { PassengersSelectorComponent } from './components/filters/passengers-selector/passengers-selector.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { SearchDetailComponent } from './pages/search-detail/search-detail/search-detail.component';
import { registerLocaleData } from '@angular/common';
import { ClientsDetailComponent } from './pages/clients_detail/clients-detail/clients-detail.component';
import { InputTextModule } from 'primeng/inputtext';
import { TableComponent } from './components/flight/table/table.component';
import { TabViewModule } from 'primeng/tabview';
import { PassengerTypePipe } from './pipes/passenger-type.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { SeatsDetailComponent } from './pages/seats-detail/seats-detail/seats-detail.component';
import { PaymentComponent } from './pages/payment/payment/payment.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { ModalComponent } from './components/modal/modal.component';
import { SeatTypePipe } from './pipes/seat-type.pipe';
import { BaggageComponent } from './pages/baggage/baggage/baggage.component';
// Registra los datos de localización en español
registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    NavbarComponent,
    FooterComponent,
    CarouselComponent,
    FilterBarComponent,
    DropdownComponent,
    FlightDetailComponent,
    BlockGUIComponent,
    MessageComponent,
    PassengersSelectorComponent,
    SearchDetailComponent,
    ClientsDetailComponent,
    TableComponent,
    PassengerTypePipe,
    SeatTypePipe,
    SeatsDetailComponent,
    PaymentComponent,
    ModalComponent,
    BaggageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    CalendarModule,
    FormsModule,
    BrowserAnimationsModule,
    DropdownModule,
    HttpClientModule,
    TableModule,
    MessagesModule,
    InputNumberModule,
    InputTextModule,
    TabViewModule,
    ReactiveFormsModule,
    NgxPayPalModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
