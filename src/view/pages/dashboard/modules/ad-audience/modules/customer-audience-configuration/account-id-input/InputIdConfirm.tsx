import { ButtonIcon, InputPassword } from '../../../../../../../components';
import { InputIdConfirmProps } from './InputIdConfirm.types';
import { useState } from 'react';
import StyledInputIdConfirm from './InputIdConfirm.styled';

export default function InputIdConfirm({ rowData, updateConfiguration, readOnly }: InputIdConfirmProps) {
  const [inputValue, setInputValue] = useState('');

  const hideButton = inputValue === rowData?.value;

  return (
    <StyledInputIdConfirm>
      <InputPassword
        key={rowData.value as string}
        initValue={rowData.value as string}
        onChange={(value) => setInputValue(value)}
        showError={false}
        label=""
        valid={(value) => value !== rowData.value}
        allowClear={false}
        debounce={300}
        readOnly={readOnly}
      />

      <ButtonIcon
        icon="apply"
        hide={hideButton}
        size="medium"
        iconWeight="fill"
        stopPropagation
        preventDefault
        variant="valid"
        onClick={() => {
          const { id, customerId, status } = rowData.row;
          return updateConfiguration(id as number, customerId, {
            status,
            accountId: inputValue,
          });
        }}
      />
    </StyledInputIdConfirm>
  );
}
