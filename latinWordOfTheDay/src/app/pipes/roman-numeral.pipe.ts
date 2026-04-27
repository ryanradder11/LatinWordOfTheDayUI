import { Pipe, PipeTransform } from '@angular/core';

const NUMERAL_MAP: [number, string][] = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100,  'C'], [90,  'XC'], [50,  'L'], [40,  'XL'],
  [10,   'X'], [9,   'IX'], [5,   'V'], [4,   'IV'],
  [1,    'I'],
];

@Pipe({
  name: 'romanNumeral',
  standalone: true
})
export class RomanNumeralPipe implements PipeTransform {

  transform(value: number): string {
    if (value <= 0) return '';
    let result = '';
    let remaining = value;
    for (const [num, numeral] of NUMERAL_MAP) {
      while (remaining >= num) {
        result += numeral;
        remaining -= num;
      }
    }
    return result;
  }
}
