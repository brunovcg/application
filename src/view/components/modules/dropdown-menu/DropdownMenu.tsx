import { StyledDropdownMenu, StyledDropdownMenuItem } from './DropdownMenu.styled';
import { DropdownMenuProps } from './DropdownMenu.types';
import { useOnClickOutside, usePopper } from '../../../../utils/hooks';
import { Ref, useRef, useState } from 'react';
import ButtonIcon from '../button-icon/ButtonIcon';
import { Icon } from '../..';
import { ClassNameHelper, DataHelper } from '../../../../utils/helpers';

const { filterMap } = DataHelper;

export default function DropdownMenu({
  options,
  width,
  closeOnClickOutside = true,
  closeOnSelect = true,
  skidding,
  trigger,
  title,
  disabled,
}: DropdownMenuProps) {
  const [displayMenu, setDisplayMenu] = useState(false);
  const dropdownContentRef = useRef<HTMLDivElement>(null);
  const { styles, attributes, setReferenceElement, setPopperElement } = usePopper({
    distance: 5,
    position: 'absolute',
    skidding: skidding ?? -70,
  });

  useOnClickOutside(dropdownContentRef, () => setDisplayMenu(false), closeOnClickOutside);

  const handleOptionClick = (click?: () => void) => {
    click?.();
    if (closeOnSelect) {
      setDisplayMenu(false);
    }
  };

  const dropdownClasses = ClassNameHelper.conditional({ ['im-dropdown-menu']: true, ['im-dropdown-disabled']: disabled });

  const optionClasses = (selected: boolean, disabledOption: boolean) =>
    ClassNameHelper.conditional({
      ['im-dropdown-menu-option']: true,
      ['im-disabled']: disabledOption,
      ['im-selected']: selected,
    });

  return (
    <StyledDropdownMenu ref={dropdownContentRef} width={width} className={dropdownClasses}>
      <div className="im-dropdown-menu-wrapper" ref={setReferenceElement as Ref<HTMLDivElement>}>
        <div
          className="im-dropdown-menu-trigger-wrapper"
          onClick={() =>
            setDisplayMenu((state) => {
              if (disabled) {
                return state;
              }
              return !state;
            })
          }
        >
          {!trigger && (
            <ButtonIcon
              disabled={disabled}
              showBorder
              variant="primary-dark"
              className="im-dropdown-menu-trigger"
              dataTestId="im-dropdown-menu-trigger"
              icon="menu"
            />
          )}
          {trigger}
        </div>

        {displayMenu && (
          <div
            data-testid="im-dropdown-menu-content"
            className="im-dropdown-menu-content"
            ref={setPopperElement as Ref<HTMLDivElement>}
            style={styles.popper}
            {...attributes.popper}
          >
            {title && <div className="im-dropdown-menu-title">{title}</div>}
            {filterMap(
              options,
              (opt) => !opt.hide,
              (option) => (
                <StyledDropdownMenuItem
                  className={optionClasses(!!option.selected, !!option.disabled)}
                  key={option.text}
                  hoverVariant={option.hoverVariant}
                  textVariant={option.textVariant}
                  selected={!!option.selected}
                  selectedBackground={option.selectedBackground}
                  onClick={() => {
                    if (!option.disabled) {
                      handleOptionClick(option.onClick);
                    }
                  }}
                >
                  <div className="im-dropdown-menu-icon">{option.icon && <Icon icon={option.icon} disabled={option.disabled} />}</div>
                  <div className="im-dropdown-menu-text">{option.text}</div>
                </StyledDropdownMenuItem>
              )
            )}
          </div>
        )}
      </div>
    </StyledDropdownMenu>
  );
}
