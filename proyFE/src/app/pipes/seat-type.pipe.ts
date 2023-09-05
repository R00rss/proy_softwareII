import { Pipe, PipeTransform } from '@angular/core';
import { SEAT_STATUS } from '../constants/states';

@Pipe({
  name: 'passengerType'
})
export class SeatTypePipe implements PipeTransform {
  transform(type: string): string {
    if (type === SEAT_STATUS.AVAILABLE) return 'Libre'
    if (type === SEAT_STATUS.OCCUPIED) return 'Ocupado'
    if (type === SEAT_STATUS.NOT_AVAILABLE) return 'No libre'
    if (type === SEAT_STATUS.SELECTED) return 'Seleccionado'
    return ''
  }
}
