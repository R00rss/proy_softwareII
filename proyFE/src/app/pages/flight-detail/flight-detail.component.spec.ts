// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ActivatedRoute, Router } from '@angular/router';
// import { FlightDetailComponent } from './flight-detail.component';
// import { FlightStateService } from 'src/app/services/states/flight/flight-state.service';
// import { of } from 'rxjs';
// import { RouterTestingModule } from '@angular/router/testing';
// import { Flight } from 'src/app/services/flights/flights.service';
// import { EXAMPLE_FLIGHTS } from 'src/app/constants/global';

// describe('FlightDetailComponent', () => {
//   let component: FlightDetailComponent;
//   let fixture: ComponentFixture<FlightDetailComponent>;
//   let mockFlightStateService: jasmine.SpyObj<FlightStateService>;
//   let mockRouter: jasmine.SpyObj<Router>;

//   beforeEach(() => {
//     mockFlightStateService = jasmine.createSpyObj('FlightStateService', ['getSelectedFlight', 'reset']);
//     mockRouter = jasmine.createSpyObj('Router', ['navigate']);

//     TestBed.configureTestingModule({
//       declarations: [FlightDetailComponent],
//       providers: [
//         { provide: ActivatedRoute, useValue: { params: of({ n: '1' }) } },
//         { provide: FlightStateService, useValue: mockFlightStateService },
//         { provide: Router, useValue: mockRouter }
//       ],
//       imports: [RouterTestingModule]
//     });

//     fixture = TestBed.createComponent(FlightDetailComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should navigate to home if no selected flight', () => {
//     mockFlightStateService.getSelectedFlight.and.returnValue(undefined);
//     component.ngOnInit();
//     expect(mockFlightStateService.reset).toHaveBeenCalled();
//     expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
//   });

//   it('should display flight details correctly', () => {
//     const mockFlight: Flight = EXAMPLE_FLIGHTS[0];
//     mockFlightStateService.getSelectedFlight.and.returnValue(mockFlight);
    
//     component.ngOnInit();

//     // Use your preferred test library/assertions to verify the rendered content
//     // For example, using Jasmine Matchers:
//     expect(component.flight).toEqual(mockFlight);
//     expect(component.flightToString).toBe(JSON.stringify(mockFlight));
//     expect(fixture.nativeElement.querySelector('.flight-id').textContent).toContain('1');
//     // ... assert other properties and elements
//   });

//   // Add more tests for other scenarios and behaviors...
// });
