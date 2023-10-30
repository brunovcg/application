import Constants from '../../constants/Constants';

const { NOT_NUMBER, NOT_NUMBER_CURRENCY } = Constants.REGEX;

abstract class MaskHelper {
  static input = {
    zipCodeMask(value: string) {
      value = value.replace(NOT_NUMBER, '');

      if (value.length >= 5) {
        value = value.substring(0, 5);
      }

      return value;
    },
    onlyNumbersMask(value: string) {
      return value.replace(NOT_NUMBER, '');
    },

    maskCurrency(value: string | number, locale = 'en-US', currency = 'USD') {
      let stringNumber = String(value);

      stringNumber = stringNumber.replace('.', '').replace(',', '').replace(NOT_NUMBER_CURRENCY, '');

      const options = { minimumFractionDigits: 2, style: 'currency', currency };

      if (!Number(stringNumber)) {
        return new Intl.NumberFormat(locale, options).format(parseFloat('0') / 100);
      }

      return new Intl.NumberFormat(locale, options).format(parseFloat(stringNumber) / 100);
    },
  };
}

export default MaskHelper;
