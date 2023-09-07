import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { MessagesService } from 'src/app/services/gui/messages/messages.service';
import { MailService } from 'src/app/services/mail/mail.service';
import { FlightStateService } from 'src/app/services/states/flight/flight-state.service';
import { PaymentService } from 'src/app/services/states/payment/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;

  public showPaypalButtons: boolean = true;

  constructor(
    private emailService: MailService,
    private paymentService: PaymentService,
    private router: Router,
    private flightStateService: FlightStateService

    // private messageService: MessagesService

  ) { }

  ngOnInit(): void {
    this.initConfig();

  }

  private initConfig(): void {
    const flight = this.flightStateService.getSelectedFlight();
    const flightReturn = this.flightStateService.getSelectedFlightReturn();
    console.log(flight);
    console.log(flightReturn)
    let payment = this.paymentService.getSelectedPayment();
    if (payment === undefined) {
      payment = {
        amount: 9 * 150.00,
        email: "",
        telephone: "0978738369"
      }
    }
    const invoice = {
      invoice_status: 'PAGADO',
      invoice_date: new Date(),
      payment_type: 'PAYPAL',
      payment_status: 'PAGADO',
      user_id: '5144d166-a2df-4d62-99d8-dc49a0e54159',
      total: payment.amount,
    }
    console.log(payment)
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'AVrf4iSi_rlOReiC4biWgY0Wk9JkaXhC-DAtk8ZI6YLcAVOR8zaQ1zv_Gn-Kgy6wUOhy3xx7a_r73HbF',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: payment?.amount + "",
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: payment?.amount + "",
                }
              }
            },
            items: [
              {
                name: 'Boletos de avión Aerolinea Horizon Jet',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'USD',
                  value: payment?.amount + "",
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {

        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point',
          JSON.stringify(data));
        this.openModal(
          data.purchase_units[0].items,
          data.purchase_units[0].amount.value
        );
        this.sendEmail(payment?.amount ? payment?.amount : 0, payment?.email ? payment?.email : "alejandra.onadelatorre@epn.edu.ec");
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    }
  }
  itemsToModal: any;
  amountToModal: any;
  showModal: boolean = false;
  closeModal() {
    this.showModal = false;
  }

  openModal(items: any, amount: any): void {
    this.showModal = true;
    this.itemsToModal = items;
    this.amountToModal = amount;
  }

  pay() {
    this.showPaypalButtons = true;
  }

  back() {
    this.showPaypalButtons = false;
  }

  sendEmail(valor: number, email: string) {
    const apiKey = 'mysecretkeyemail';
    const emailData = {
      recipients: [email],
      body: {
        "Valor total": "$ " + valor,
      },
      subject: 'Detalle de su compra',
    };

    this.emailService.sendEmail(apiKey, emailData).subscribe(
      (response) => {
        console.log('Correo electrónico enviado exitosamente', response);
      },
      (error) => {
        console.error('Error al enviar el correo electrónico', error);
      }
    );
  }

}
