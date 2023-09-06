import { Component, OnInit } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { MailService } from 'src/app/services/mail/mail.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;

  public showPaypalButtons: boolean = true;

  constructor(
    private modalService: NgbModal,
    private emailService: MailService
  ) { }

  ngOnInit(): void {
    this.initConfig();
  }
  
  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'AVrf4iSi_rlOReiC4biWgY0Wk9JkaXhC-DAtk8ZI6YLcAVOR8zaQ1zv_Gn-Kgy6wUOhy3xx7a_r73HbF',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: '600.0',
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: '600.0'
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
                  value: '150.00',
                },
              },
              {
                name: 'Boletos de avión Aerolinea Horizon Jet',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'USD',
                  value: '150.00',
                },
              },
              {
                name: 'Boletos de avión Aerolinea Horizon Jet',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'USD',
                  value: '150.00',
                },
              },
              {
                name: 'Boletos de avión Aerolinea Horizon Jet',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'USD',
                  value: '150.00',
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
        this.sendEmail();
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

  openModal(items: any, amount: any): void {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.items = items;
    modalRef.componentInstance.amount = amount;
  }

  pay() {
    this.showPaypalButtons = true;
  }
 
  back(){
    this.showPaypalButtons = false;
  }

  sendEmail() {
    const apiKey = 'mysecretkeyemail';
    const emailData = {
      recipients: ['alejandra.onadelatorre@epn.edu.ec'],
      body: {
        "Cantidad de boletos ": "4",
        "Adulto ": "Alejandra Oña",
        "Niño": "David Alcívar",
        "Maletas adicionales ": "No",
        "Fecha de ida ":"10-09-2023",
        "Fecha de regreso ": "15-09-2023",
        "Asientos escogidos ": "A1,A2",
        "Aeropuerto de origen (ida) " : "Quito",
        "Aeropuerto de destino (ida) ": "Guayaquil",
        "Aeropuerto de origen (vuelta) " : "Guayaquil",
        "Aeropuerto de destino (vuelta) ": "Quito",
        "Hora de salida": "15:00",
        "Valor total ": "150.00 USD"
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
