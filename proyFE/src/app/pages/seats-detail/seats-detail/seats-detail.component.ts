import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SEAT_STATUS } from 'src/app/constants/states';
import { PassengerInfo } from 'src/app/model/passengers';
import { MessagesService } from 'src/app/services/gui/messages/messages.service';
import { PlaneSeatsService, Seat } from 'src/app/services/seats/plane-seats.service';
import { FlightStateService } from 'src/app/services/states/flight/flight-state.service';
import { PassengersService } from 'src/app/services/states/passengers/passengers.service';
import { PaymentService } from 'src/app/services/states/payment/payment.service';
interface SeatEditable extends Seat {
  new_seat_status?: string;
}

interface Color {
  color: string;
  status: string;
}

@Component({
  selector: 'app-seats-detail',
  templateUrl: './seats-detail.component.html',
  styleUrls: ['./seats-detail.component.css']
})
export class SeatsDetailComponent {
  seats: Seat[] = [];
  seat_status = SEAT_STATUS;
  passengers: PassengerInfo[] = [];
  numberOfPassengers: number = 0;
  seatsNumber: number = 0;
  totalSeats: number = 0;
  showSeatsSelection: boolean = false;
  colors: Color[] = [
    { color: '#4bad21', status: SEAT_STATUS.AVAILABLE },
    { color: '#3329e6', status: SEAT_STATUS.OCCUPIED },
    { color: '#a6230f', status: SEAT_STATUS.NOT_AVAILABLE },
    { color: 'var(--primary-color)', status: SEAT_STATUS.SELECTED },
  ]
  constructor(
    private flightStateService: FlightStateService,
    private passengersService: PassengersService,
    private seatService: PlaneSeatsService,
    private router: Router,
    private messagesService: MessagesService,
    private route: ActivatedRoute,
    private paymentService: PaymentService

  ) {
    // this.route.queryParams.subscribe(params => {
    //   console.log({ params })
    // });
    const flight = this.flightStateService.getSelectedFlight();
    const passengers = this.passengersService.getSelectedPassenger();

    // if (flight === undefined) {
    //   // redirect to previous page
    //   window.history.back();
    // }

    if (flight) {

      this.seatService.getSeatsByPlaneId(flight.plane_id).subscribe((seats) => {
        console.log(seats)
        this.seats = seats;
      })
    } else {
      this.seatService.getSeats().subscribe((seats) => {
        console.log(seats)
        this.seats = seats;
      }
      )
    }
    if (passengers) {
      this.passengers = passengers;
      this.numberOfPassengers = passengers.length;
      this.seatsNumber = passengers.length;
      this.totalSeats = passengers.length;

    } else {
      // this.passengers = [];
      this.numberOfPassengers = 2;
      this.seatsNumber = 2;
      this.totalSeats = 2;
    }

  }



  // mapSeatsToSeatsEditable(seats: Seat[]): SeatEditable[] {
  //   return seats.map((seat) => {
  //     return {
  //       ...seat,
  //       new_seat_status: seat.seat_status
  //     }
  //   })
  // }
  selectSeat(seat: Seat) {
    console.log(seat)
    if (this.seatsNumber === 0) {
      this.messagesService.showMessageWithContent({ severity: 'info', summary: 'Alerta', detail: 'No hay mas asientos disponibles' })
      return;
    }
    if (seat.seat_status === SEAT_STATUS.AVAILABLE) {
      seat.seat_status = SEAT_STATUS.SELECTED;
      this.seatsNumber--;
    }
  }

  goToHome() {
    this.router.navigate(['/'])

  }

  goToPayment() {

    const selectedPayment = this.paymentService.getSelectedPayment();
    if (selectedPayment === undefined) {
      console.log("selectedPayment es undefined")
      return;
    }
    const prevAmount = selectedPayment.amount ? selectedPayment.amount : 0;
    this.paymentService.setSelectedPayment({
      ...selectedPayment,
      amount: prevAmount + this.totalSeats * 20
    });

    this.seatService.updateSeats(this.seats).subscribe((seats) => {
      console.log(seats)
      this.router.navigate(['/payment'])
    }
    )
  }


  getColorByStatus(status: string) {
    if (status === SEAT_STATUS.AVAILABLE)
      return '#4bad21';
    if (status === SEAT_STATUS.OCCUPIED)
      return '#3329e6';
    if (status === SEAT_STATUS.NOT_AVAILABLE)
      return '#a6230f';
    if (status === SEAT_STATUS.SELECTED)
      return 'var(--primary-color)';
    return '';

  }

}

