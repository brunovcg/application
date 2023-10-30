import { useTranslation } from 'react-i18next';
import { Readonly } from '../../../../components';
import { StyledAddressField } from './AddressField.styled';
import { AddressFieldProps } from './AddressField.types';

export default function AddressField({ text, label, width, enabledTooltip = true, height = '45px', loading }: AddressFieldProps) {
  const { t } = useTranslation();

  const valueRenderer = <span className="im-address-field-value">{text ?? <span className="im-no-text">{t('Common.None')}</span>}</span>;

  return (
    <StyledAddressField width={width} height={height} className="im-address-field">
      <Readonly label={label} text={valueRenderer} width={width} flexGrow loading={loading} enabledTooltip={enabledTooltip} />
    </StyledAddressField>
  );
}
