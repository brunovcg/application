abstract class CurrencyHelper {
  static toUSD(value: number) {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }
}
export default CurrencyHelper;
