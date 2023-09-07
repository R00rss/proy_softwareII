import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


interface PaymentInfo {
  email: string;
  telephone: string;
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private selectedPaymentSubject: BehaviorSubject<PaymentInfo | undefined> = new BehaviorSubject<PaymentInfo | undefined>(undefined);
  public selectedPayment$: Observable<PaymentInfo | undefined> = this.selectedPaymentSubject.asObservable();
  constructor() { }

  setSelectedPayment(payment: PaymentInfo) {
    this.selectedPaymentSubject.next(payment);
  }
  getSelectedPayment(): PaymentInfo | undefined {
    return this.selectedPaymentSubject.value;
  }
  reset() {
    this.selectedPaymentSubject.next(undefined);
  }
}
