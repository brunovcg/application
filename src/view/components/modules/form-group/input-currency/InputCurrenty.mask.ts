export const maskCurrency = (value: string, locale = 'en-US') => {
  if (value === '') return '0,00';

  const valorNumber = Number(value.replace(/\D+/g, ''));
  if (valorNumber === 0) return '0,00';
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valorNumber / 100);
};
