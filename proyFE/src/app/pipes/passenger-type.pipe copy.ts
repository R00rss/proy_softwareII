import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'passengerType'
})
// export class PassengerTypePipe implements PipeTransform {
//   transform(type: string): string {
//     if (type === 'adults') return 'Adulto'
//     if (type === 'children') return 'Niño'
//     if (type === 'infants') return 'Infante'
//     if (type === 'old') return 'Adulto mayor'
//     return ''
//   }
// }

export class PassengerTypePipe implements PipeTransform {
  transform(type: string, index: number): string {
    let typeString = '';
    switch (type) {
      case 'adults':
        typeString = 'Adulto';
        break;
      case 'children':
        typeString = 'Niño';
        break;
      case 'infants':
        typeString = 'Infante';
        break;
      case 'old':
        typeString = 'Adulto mayor';
        break;
      default:
        typeString = '';
        break;
    }
    
    return `${typeString} ${index}`;
  }
}
