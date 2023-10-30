import { ClassNameHelper } from '../../../../../../utils/helpers';
import { StyledAutocompleteOption } from './AutocompleteOption.styled';

import { AutoCompleteOptionProps } from './AutocompleteOption.types';

const optionClasses = (selected: boolean) => ClassNameHelper.conditional({ ['im-autocomplete-option']: true, ['im-selected']: selected });

export default function AutoCompleteOption<Option>({
  onSelect,
  opt,
  autocompleteValue,
  handleOptionClick,
}: AutoCompleteOptionProps<Option>) {
  return (
    <StyledAutocompleteOption
      key={opt as string}
      onClick={() => {
        onSelect?.(opt);
        handleOptionClick(opt);
      }}
      className={optionClasses(opt === autocompleteValue)}
      data-testid={`im-autocomplete-option-${opt}`}
    >
      <p className="im-autocomplete-option-text">{opt as string}</p>
    </StyledAutocompleteOption>
  );
}
