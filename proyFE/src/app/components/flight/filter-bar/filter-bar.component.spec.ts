import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterBarComponent } from './filter-bar.component';
import { AirportsService } from 'src/app/services/airports/airports.service';
import { Flight, FlightsService } from 'src/app/services/flights/flights.service';
import { BlockGUIService } from 'src/app/services/gui/blockGUI/block-gui.service';
import { MessagesService } from 'src/app/services/gui/messages/messages.service';
import { FlightStateService } from 'src/app/services/states/flight/flight-state.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { Observable, of } from 'rxjs';
import { Column, ListAndCount } from 'src/app/model/global';
import { By } from '@angular/platform-browser';
import { EXAMPLE_FLIGHTS } from 'src/app/constants/global';
import { FILTER_MESSAGES } from 'src/app/constants/messages';
import { OPTIONS_TRIP } from 'src/app/constants/filters';

describe('FilterBarComponent', () => {
  let component: FilterBarComponent;
  let fixture: ComponentFixture<FilterBarComponent>;
  let airportsService: AirportsService;
  let flightsService: FlightsService;
  let blockGUIService: BlockGUIService;
  let messagesService: MessagesService;
  let flightStateService: FlightStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterBarComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        CalendarModule,
        DropdownModule,
        TableModule,
      ],
      providers: [
        AirportsService,
        FlightsService,
        BlockGUIService,
        MessagesService,
        FlightStateService,
      ],
    });
    fixture = TestBed.createComponent(FilterBarComponent);
    component = fixture.componentInstance;
    airportsService = TestBed.inject(AirportsService);
    flightsService = TestBed.inject(FlightsService);
    blockGUIService = TestBed.inject(BlockGUIService);
    messagesService = TestBed.inject(MessagesService);
    flightStateService = TestBed.inject(FlightStateService);
  });

  it('1. Se debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('2. Debe generar tripOptions y seleccionar la primera opción', () => {
    const mockTripOptions = [{ code: '1', name: 'Option 1' }, { code: '2', name: 'Option 2' }];
    spyOn(airportsService, 'getOptionsTrip').and.returnValue(of(mockTripOptions));
    fixture.detectChanges();
    expect(component.tripOptions).toEqual(mockTripOptions);
    expect(component.selectedTrip).toEqual(mockTripOptions[0]);
  });

  it('3. Debe generar destinationsCombo y seleccionar la primera opción', () => {
    const mockDestinationOptions = [{ code: 'D1', name: 'Destination 1' }, { code: 'D2', name: 'Destination 2' }];
    spyOn(airportsService, 'getDestinationsCombo').and.returnValue(of(mockDestinationOptions));
    fixture.detectChanges();
    expect(component.destinationOptions).toEqual(mockDestinationOptions);
    expect(component.selectedDestination).toEqual(mockDestinationOptions[0]);
  });

  it('4. Debe realiza la búsqueda cuando se haga click en el botón', () => {
    spyOn(component, 'searchFlights');
    fixture.detectChanges();
    const searchButton = fixture.debugElement.query(By.css('#searchFlightButton')).nativeElement;
    searchButton.click();
    expect(component.searchFlights).toHaveBeenCalled();
  });

  it('5. Si listAndCountFlights tiene data se genera la tabla', () => {

    const mockListAndCountFlights: ListAndCount<Flight> = {
      count: 1,
      data: EXAMPLE_FLIGHTS,
    };
    component.listAndCountFlights = mockListAndCountFlights;
    fixture.detectChanges();
    const table = fixture.debugElement.query(By.css('#flightsTableContainer'));
    expect(table).toBeTruthy();

  }
  );
  it('6. Si se ejecuta searchFlights y si alguno de los filtros es undefined o null se debe mostrar un mensaje de error', () => {
    spyOn(messagesService, 'showMessageWithContent');
    component.selectedTrip = undefined;
    component.selectedDestination = undefined;
    component.selectedOrigin = undefined;
    component.searchFlights();
    expect(messagesService.showMessageWithContent).toHaveBeenCalled();
  }
  );
  it('7. Si se ejecuta searchFlights y si ninguno de los filtros es undefined o null pero la fecha de salida y llegada son iguales se debe mostrar un mensaje de error', () => {
    spyOn(messagesService, 'showMessageWithContent');
    component.selectedTrip = { code: OPTIONS_TRIP.ROUND_TRIP, name: 'Option 1' };
    component.selectedDestination = { code: '2', name: 'Destination 1' };
    component.selectedOrigin = { code: '43', name: 'Origin 1' };
    component.selectedFromDate = new Date();
    component.selectedToDate = new Date();
    component.searchFlights();
    // verify if showMessageWithContent is called and messageSubject has the value of FILTER_MESSAGES.ORIGIN_DESTINATION_NOT_SAME
    expect(messagesService.showMessageWithContent).toHaveBeenCalledWith({ severity: 'warn', summary: 'Alerta', detail: FILTER_MESSAGES.FROM_DATE_NOT_MINOR_OR_EQUAL_TO_DATE });
  }
  );

  it('8. Si se ejecuta searchFlights y si ninguno de los filtros es undefined o null pero el origen y el destino son iguales se muestra un mensaje de error', () => {
    spyOn(messagesService, 'showMessageWithContent');
    component.selectedTrip = { code: OPTIONS_TRIP.ROUND_TRIP, name: 'Option 1' };
    component.selectedDestination = { code: '123456', name: 'Destination 1' };
    component.selectedOrigin = { code: '123456', name: 'Origin 1' };
    component.searchFlights();
    // verify if showMessageWithContent is called and messageSubject has the value of FILTER_MESSAGES.ORIGIN_DESTINATION_NOT_SAME
    expect(messagesService.showMessageWithContent).toHaveBeenCalledWith({ severity: 'error', summary: 'Error', detail: FILTER_MESSAGES.ORIGIN_DESTINATION_NOT_SAME });
  }
  );

  it('9. Si se ejecuta searchFlights y ninguno de los filtros es undefined o null y todos los filtros son correctos debería cambiar el valor de listAndCountFlights', () => {
    spyOn(messagesService, 'showMessageWithContent');
    spyOn(flightsService, 'searchFlights').and.returnValue(of({ count: 1, data: EXAMPLE_FLIGHTS }));
    component.selectedTrip = { code: OPTIONS_TRIP.ONE_WAY, name: 'Option 1' };
    component.selectedDestination = { code: 'Quito', name: 'Quito' };
    component.selectedOrigin = { code: 'Guayaquil', name: 'Guayaquil' };
    component.selectedFromDate = new Date();
    component.searchFlights();
    fixture.detectChanges();

    // expect(messagesService.showMessageWithContent).toHaveBeenCalledWith({ severity: 'error', summary: 'Error', detail: FILTER_MESSAGES.ORIGIN_DESTINATION_NOT_SAME });
    expect(flightsService.searchFlights).toHaveBeenCalledWith(
      { skip: 0, limit: 100, dateFrom: component.selectedFromDate, dateTo: component.selectedTrip.code === OPTIONS_TRIP.ROUND_TRIP ? component.selectedToDate : undefined, destination: component.selectedDestination.code, origin: component.selectedOrigin.code }
    );
    expect(component.listAndCountFlights).not.toEqual(undefined);
  }
  );
  it('10. Si la tabla tiene data y se hace click en un detalle de vuelo debe redirigirse a detalle', () => {
    spyOn(component, 'flightSelect');
    component.listAndCountFlights = { count: 1, data: EXAMPLE_FLIGHTS };
    fixture.detectChanges();
    const flightDetailButton = fixture.debugElement.query(By.css(`#${component.getValidSelectorByUUID(EXAMPLE_FLIGHTS[0].id)}`)).nativeElement;
    expect(flightDetailButton).toBeTruthy();
    flightDetailButton.click();
    expect(component.flightSelect).toHaveBeenCalled();
    fixture.detectChanges();
    expect(component.flightSelect).toHaveBeenCalledWith(EXAMPLE_FLIGHTS[0]);
    // verify that the router navigate to /flight_detail/2000
  }
  );

});
