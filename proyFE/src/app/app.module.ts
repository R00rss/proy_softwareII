import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    MessagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
