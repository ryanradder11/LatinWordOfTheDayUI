import { RomanNumeralPipe } from './roman-numeral.pipe';

describe('RomanNumeralPipe', () => {
  let pipe: RomanNumeralPipe;

  beforeEach(() => {
    pipe = new RomanNumeralPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('single-value numerals', () => {
    it('converts 1 to I', () => expect(pipe.transform(1)).toBe('I'));
    it('converts 4 to IV', () => expect(pipe.transform(4)).toBe('IV'));
    it('converts 5 to V', () => expect(pipe.transform(5)).toBe('V'));
    it('converts 9 to IX', () => expect(pipe.transform(9)).toBe('IX'));
    it('converts 10 to X', () => expect(pipe.transform(10)).toBe('X'));
    it('converts 40 to XL', () => expect(pipe.transform(40)).toBe('XL'));
    it('converts 50 to L', () => expect(pipe.transform(50)).toBe('L'));
    it('converts 90 to XC', () => expect(pipe.transform(90)).toBe('XC'));
    it('converts 100 to C', () => expect(pipe.transform(100)).toBe('C'));
    it('converts 400 to CD', () => expect(pipe.transform(400)).toBe('CD'));
    it('converts 500 to D', () => expect(pipe.transform(500)).toBe('D'));
    it('converts 900 to CM', () => expect(pipe.transform(900)).toBe('CM'));
    it('converts 1000 to M', () => expect(pipe.transform(1000)).toBe('M'));
  });

  describe('compound numbers', () => {
    it('converts 3 to III', () => expect(pipe.transform(3)).toBe('III'));
    it('converts 8 to VIII', () => expect(pipe.transform(8)).toBe('VIII'));
    it('converts 14 to XIV', () => expect(pipe.transform(14)).toBe('XIV'));
    it('converts 27 to XXVII', () => expect(pipe.transform(27)).toBe('XXVII'));
    it('converts 44 to XLIV', () => expect(pipe.transform(44)).toBe('XLIV'));
    it('converts 58 to LVIII', () => expect(pipe.transform(58)).toBe('LVIII'));
    it('converts 99 to XCIX', () => expect(pipe.transform(99)).toBe('XCIX'));
    it('converts 399 to CCCXCIX', () => expect(pipe.transform(399)).toBe('CCCXCIX'));
  });

  describe('years', () => {
    it('converts 1999 to MCMXCIX', () => expect(pipe.transform(1999)).toBe('MCMXCIX'));
    it('converts 2000 to MM', () => expect(pipe.transform(2000)).toBe('MM'));
    it('converts 2024 to MMXXIV', () => expect(pipe.transform(2024)).toBe('MMXXIV'));
    it('converts 2026 to MMXXVI', () => expect(pipe.transform(2026)).toBe('MMXXVI'));
    it('converts 1776 to MDCCLXXVI', () => expect(pipe.transform(1776)).toBe('MDCCLXXVI'));
  });

  describe('edge cases', () => {
    it('returns empty string for 0', () => expect(pipe.transform(0)).toBe(''));
    it('returns empty string for negative numbers', () => expect(pipe.transform(-5)).toBe(''));
  });
});
