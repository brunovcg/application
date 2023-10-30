import { forwardRef, useRef, useEffect, RefObject } from 'react';
import { Checkbox } from '../../../..';
import { TableCheckboxProps } from '../../root-component/Table.types';

const TableCheckbox = forwardRef(({ indeterminate, label, ...rest }: TableCheckboxProps, ref) => {
  const defaultRef = useRef<HTMLInputElement>();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    (resolvedRef as unknown as { current: { indeterminate: unknown } }).current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return <Checkbox label={label} ref={resolvedRef as RefObject<HTMLInputElement>} {...rest} />;
});

TableCheckbox.displayName = 'Checkbox';

export default TableCheckbox;
