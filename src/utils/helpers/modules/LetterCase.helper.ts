import Constants from '../../constants/Constants';

const { DASH_UNDERSCORE_DOT, CAPITAL_LETTERS } = Constants.REGEX;

abstract class LetterCaseHelper {
  static snakeToCapitalize(string?: string | null) {
    if (!string) {
      return '';
    }
    return string
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  static capitalize(string?: string | number) {
    if (!string || typeof string !== 'string') {
      return string;
    }
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  static replaceDashUnderscoreDot(string: string) {
    return string.replace(DASH_UNDERSCORE_DOT, ' ');
  }

  static camelToTitleCase(string: string) {
    const mappedString = string.replace(CAPITAL_LETTERS, ' $1');

    return mappedString.charAt(0).toUpperCase() + mappedString.slice(1);
  }

  static regularToTitleCase(string: string) {
    return string
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}

export default LetterCaseHelper;
