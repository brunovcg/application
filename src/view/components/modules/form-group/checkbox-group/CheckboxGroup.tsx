import { ForwardedRef, forwardRef, useContext, useEffect, useState, useImperativeHandle } from 'react';
import Container from '../../container/Container';
import Checkbox from '../checkbox/Checkbox';
import { FormContext } from '../form/Form';
import StyledCheckboxGroup from './CheckboxGroup.styled';
import { CheckboxGroupRef, CheckboxGroupProps, CheckboxOption } from './CheckboxGroup.types';
import { DataHelper } from '../../../../../utils/helpers';

const { filterMap } = DataHelper;

function CheckboxGroup(
  { options, width, maxWidth, name, onChange, label, row = false, disabled, requiredLabel, showError = true }: CheckboxGroupProps,
  ref: ForwardedRef<CheckboxGroupRef>
) {
  const { setValue, isFieldRequired, errors, getValues, setError } = useContext(FormContext);
  const [mappedOptions, setMappedOptions] = useState(options);

  const [output, setOutput] = useState<CheckboxOption[]>([]);

  useEffect(() => {
    const initState = filterMap(
      options,
      (option) => !!option.checked,
      (option) => ({ id: option.id, label: option.label })
    );
    setOutput(initState);
    if (name) {
      setValue(name, initState);
    }
  }, []);

  useEffect(() => {
    if (name) {
      setValue(name, output);
      if (output.length) {
        setError(name, { message: '' });
      }
    }
    onChange?.(output);
  }, [output]);

  const handleOptionClick = (selection: boolean, item: CheckboxOption) => {
    if (selection) {
      if (name) {
        const hookFormValue = getValues()[`${String(name)}`];
        hookFormValue.push(item);
        setValue(name, []);
      }

      setOutput((state) => [...state, { ...item, checked: selection }]);
    } else {
      const newOutput = [...output];
      const itemOutputIndex = output.findIndex((option) => option.id === item.id);

      newOutput.splice(itemOutputIndex, 1);
      setOutput(newOutput);
    }

    const itemOptionIndex = mappedOptions.findIndex((option) => option.id === item.id);

    const newMappedOptions = [...mappedOptions];

    newMappedOptions[Number(itemOptionIndex)] = {
      ...newMappedOptions[Number(itemOptionIndex)],
      checked: selection,
    };

    setMappedOptions(newMappedOptions);
  };

  const error = errors?.[String(name)]?.message as string;

  const hasRequiredLabel = requiredLabel || (name ? isFieldRequired?.(name) : false);

  const clearCheckboxes = () => {
    setOutput([]);
    setMappedOptions(options.map((opt) => ({ ...opt, checked: false })));
  };

  const resetCheckboxes = () => {
    setOutput(options.filter((opt) => !!opt.checked));
    setMappedOptions(options);
  };

  useImperativeHandle(ref, () => ({ clearCheckboxes, resetCheckboxes }));

  return (
    <StyledCheckboxGroup className="im-checkbox-group" width={width} row={row} maxWidth={maxWidth} key={mappedOptions.toString()}>
      <Container
        className="im-checkbox-group-content"
        label={label}
        requiredLabel={hasRequiredLabel}
        error={!!error}
        hoverable
        errorMessage={error}
        showError={!!name && showError}
      >
        {mappedOptions.map((item) => (
          <Checkbox
            key={String(item.id)}
            label={item.label}
            checked={item.checked}
            disabled={item.disabled ?? disabled}
            onClick={(sel) => handleOptionClick(sel, item)}
          />
        ))}
      </Container>
    </StyledCheckboxGroup>
  );
}

export default forwardRef(CheckboxGroup);
