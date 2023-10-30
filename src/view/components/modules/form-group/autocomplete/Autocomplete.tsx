import {
  ChangeEvent,
  MutableRefObject,
  Ref,
  useContext,
  useMemo,
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { StyledAutocomplete, StyledAutocompleteList } from './Autocomplete.styled';
import { AutocompleteProps, AutocompleteRef } from './Autocomplete.types';
import { DOMHelper, DataHelper, ClassNameHelper } from '../../../../../utils/helpers';
import ButtonIcon from '../../button-icon/ButtonIcon';
import Container from '../../container/Container';
import LoadingSpinner from '../../loading-spinner/LoadingSpinner';
import { FormContext } from '../form/Form';
import { useElementSize, usePopper, useOnClickOutside, useDebounce, useTranslationPath } from '../../../../../utils/hooks';
import AutoCompleteOption from './components/AutocompleteOption';
import { useTranslation } from 'react-i18next';
import MessageContainer from '../../message-container/MessageContainer';

const { filterMap } = DataHelper;

function Autocomplete<Option extends string>(
  {
    options,
    asyncOptions,
    loading,
    placeholder,
    onSelect,
    label,
    name,
    requiredLabel,
    width,
    maxWidth,
    onStopTyping,
    onType,
    disabled,
    showError = true,
    maskFunction,
    debounce,
  }: AutocompleteProps<Option>,
  ref: ForwardedRef<AutocompleteRef>
) {
  const [autocompleteValue, setAutocompleteValue] = useState('');
  const { styles, attributes, setReferenceElement, setPopperElement } = usePopper();
  const { isFieldRequired, register, errors, setError } = useContext(FormContext);
  const [isFocused, setIsFocused] = useState(false);
  const zIndex = useMemo(() => DOMHelper.windowNextZIndex(), []);
  const hasRequiredLabel = requiredLabel ?? (name ? isFieldRequired?.(name) : false);
  const { t } = useTranslation();
  const path = useTranslationPath('Components.Autocomplete');

  const { debouncedValue, isDebouncing } = useDebounce<Option>({
    value: autocompleteValue as Option,
    delay: debounce ?? 400,
  });

  const hasOptions = !!options?.length || !!asyncOptions?.length;

  const isSearchedInOptions = (searched: string) => {
    if (options && !options.includes(searched as Option)) {
      return false;
    }
    return !!asyncOptions?.includes(searched as Option);
  };

  const clearAutocomplete = () => {
    setAutocompleteValue('');
    onSelect?.('' as Option);
  };

  useImperativeHandle(ref, () => ({ clearAutocomplete }));

  const handleClose = (opt: string) => {
    if (!isSearchedInOptions(opt)) {
      setAutocompleteValue('');
      onStopTyping?.('' as Option);
    }
  };

  const handleOptionClick = (opt: string) => {
    setAutocompleteValue(opt);
    handleClose(opt);
    setIsFocused(false);
  };

  const autocompleteOptionRenderer = (opt: Option) => (
    <AutoCompleteOption
      key={opt as string}
      handleOptionClick={handleOptionClick}
      opt={opt}
      onSelect={onSelect as (opt: string) => void}
      autocompleteValue={autocompleteValue}
    />
  );

  const optionsRenderer = () => {
    if (options?.length) {
      return filterMap(
        options,
        (opt) => opt.toLowerCase().includes(autocompleteValue),
        (opt) => autocompleteOptionRenderer(opt)
      );
    }
    return asyncOptions?.map((opt) => autocompleteOptionRenderer(opt));
  };

  const handleInputType = (e: ChangeEvent<HTMLInputElement>) => {
    let typedValue = e.target.value;

    if (maskFunction) {
      typedValue = maskFunction(typedValue);
    }

    onType?.(typedValue);
    setAutocompleteValue(typedValue);
    if (name) {
      setError(name, {});
    }
  };
  const componentRef = useRef<HTMLDivElement>(null);
  const { elementSize } = useElementSize(componentRef as MutableRefObject<HTMLElement>);

  useOnClickOutside(
    [componentRef],
    () => {
      setIsFocused(false);
      handleClose(autocompleteValue);
    },
    isFocused
  );

  const classes = ClassNameHelper.conditional({
    ['im-autocomplete']: true,
    ['im-search-selected']: isSearchedInOptions(autocompleteValue),
    ['im-disabled']: disabled,
  });

  useEffect(() => {
    handleClose(autocompleteValue);
  }, [isFocused]);

  useLayoutEffect(() => {
    if (debouncedValue && !asyncOptions?.includes(debouncedValue)) {
      onStopTyping?.(debouncedValue);
    }
  }, [debouncedValue]);

  const isLoading = isDebouncing || loading || (asyncOptions === null && !loading);

  const formProps = name ? { ...register(name) } : {};

  const error = errors?.[String(name)]?.message as string;

  return (
    <StyledAutocomplete className={classes} ref={componentRef} width={width} maxWidth={maxWidth}>
      <Container
        label={label}
        requiredLabel={hasRequiredLabel}
        ref={setReferenceElement as Ref<HTMLDivElement>}
        errorMessage={error}
        error={!!error}
        showError={!!name && showError}
        disabled={disabled}
      >
        <div className="im-autocomplete-display">
          <input
            autoComplete="off"
            className="im-autocomplete-input"
            value={autocompleteValue}
            disabled={disabled}
            placeholder={placeholder ?? t(path('Placeholder'))}
            onFocus={() => setIsFocused(true)}
            {...formProps}
            onChange={handleInputType}
          />
          <div className="im-autocomplete-buttons">
            {!isLoading && !!autocompleteValue.length && !disabled && (
              <ButtonIcon
                icon="close"
                size="small"
                preventDefault
                stopPropagation
                onClick={() => {
                  onSelect?.('' as Option);
                  setAutocompleteValue('');
                }}
              />
            )}
          </div>
        </div>
      </Container>
      {isFocused && !!autocompleteValue.length && (
        <StyledAutocompleteList
          className="im-autocomplete-list"
          zIndex={zIndex}
          displayWidth={elementSize.width}
          style={styles.popper}
          {...attributes.popper}
          ref={setPopperElement as Ref<HTMLDivElement>}
        >
          {hasOptions && !isLoading && <div className="im-autocomplete-list-content">{optionsRenderer()}</div>}
          {!hasOptions && !isLoading && <MessageContainer text={t(path('NoMatches'))} variant="warning" fontSize="small" />}
          {isLoading && <LoadingSpinner size="tiny" message />}
        </StyledAutocompleteList>
      )}
    </StyledAutocomplete>
  );
}

export default forwardRef(Autocomplete);
