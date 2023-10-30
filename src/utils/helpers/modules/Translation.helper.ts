import i18next from 'i18next';

abstract class TranslationHelper {
  static yup = {
    wrongPattern: i18next.t('Yup.ErrorMessages.WrongPattern'),
    oneUpperCase: i18next.t('Yup.ErrorMessages.OneUpperCase'),
    oneLowerCase: i18next.t('Yup.ErrorMessages.OneLowerCase'),
    invalidEmail: i18next.t('Yup.ErrorMessages.InvalidEmail'),
    mustMatchPassword: i18next.t('Yup.ErrorMessages.MustMatchPassword'),
    minCharacters: (number: number) => i18next.t('Yup.ErrorMessages.MinCharacters', { number }),
    requiredField: i18next.t('Yup.ErrorMessages.RequiredField'),
    noWhiteSpaces: i18next.t('Yup.ErrorMessages.WhiteSpace'),
    onlyNumbers: i18next.t('Yup.ErrorMessages.OnlyNumbers'),
    maxFileSize: (size: string) => i18next.t('Yup.ErrorMessages.FileMaxSize', { size }),
    maxSizePerFile: (size: string) => i18next.t('Yup.ErrorMessages.MaxSizePerFile', { size }),
    atLeastNumberSelection: (number: number) => {
      if (number === 1) {
        return i18next.t('Yup.ErrorMessages.AtLeastOneItem');
      }
      return i18next.t('Yup.ErrorMessages.AtLeastNItems', { number });
    },
    length: (number: number) => i18next.t('Yup.ErrorMessages.Length', { number }),
  };
}

export default TranslationHelper;
