import { useTranslation } from 'react-i18next';
import { DataHelper, ClassNameHelper } from '../../../../../utils/helpers';
import Container from '../../container/Container';
import Checkbox from '../../form-group/checkbox/Checkbox';
import InputText from '../../form-group/input-text/InputText';
import Title from '../../title/Title';
import { useTranslationPath } from '../../../../../utils/hooks';
import { AddRemoveListContainerProps } from './AddRemoveListContainer.types';
import { useState } from 'react';
import Button from '../../button/Button';

const { filterMap } = DataHelper;

export default function AddRemoveListContainer<ListType>({
  accessor,
  list,
  title,
  onOptionClick,
  allClick,
  variant,
  disabled,
}: AddRemoveListContainerProps<ListType>) {
  const { t } = useTranslation();
  const path = useTranslationPath('Components.AddRemoveList');
  const [searchListType, setSearchListTypeList] = useState('');
  const [displayOnlyChanged, setDisplayOnlyChanges] = useState(false);
  const [hoveredOption, setHoveredOption] = useState('');

  const type = {
    displayOnly: variant === 'submit' ? t(path('DisplayAdded')) : t(path('DisplayRemoved')),
    className: variant === 'submit' ? 'im-add' : 'im-remove',
    hoverOption: (status: boolean) => {
      if (variant === 'submit') {
        return !status ? t(path('CancelAddition')) : t(path('Remove'));
      }
      return status ? t(path('CancelRemoval')) : t('Common.Add');
    },
  };

  const setOption = (status: boolean) => {
    const isAdded = !status && variant === 'submit';
    const isRemoved = status && variant === 'available';

    return {
      textClasses: ClassNameHelper.conditional({
        ['im-add-remove-list-option-name']: true,
        ['im-add-remove-list-option-added']: isAdded,
        ['im-add-remove-list-option-removed']: isRemoved,
        ['im-disabled']: disabled,
      }),
      getSuffix: () => {
        if (isAdded) {
          return t(path('Added'));
        }
        if (isRemoved) {
          return t(path('Removed'));
        }
        return '';
      },
    };
  };

  const clickAllTitle = variant === 'submit' ? 'Remove All' : 'Add All';
  const clickAllIcon = variant === 'submit' ? 'delete' : 'done';

  const optionClasses = ClassNameHelper.conditional({
    ['im-add-remove-list-option']: true,
    ['im-disabled']: disabled,
    [type.className]: true,
  });

  return (
    <div className="im-add-remove-list-container">
      <div className="im-add-remove-list-title">
        <Title text={title} marginBottom="0" />
        <span className="im-list-count">&nbsp;{`(${list.length})`}</span>
        {allClick && (
          <Button
            text={clickAllTitle}
            onClick={() => {
              if (disabled) return;
              allClick();
            }}
            variant="primary"
            icon={clickAllIcon}
            styling="text"
          />
        )}
      </div>
      <div className="im-list-filters">
        <InputText width="200px" placeholder={t('Common.Search')} onChange={(value) => setSearchListTypeList(value?.toLowerCase())} />
        <Checkbox label={type.displayOnly} checked={displayOnlyChanged} onChange={(e) => setDisplayOnlyChanges(e.target.checked)} />
      </div>
      <Container className="im-options-list">
        {filterMap(
          list,
          (item) => {
            const includesSearch = (item[String(accessor) as keyof typeof item] as string)?.toLowerCase()?.includes(searchListType);
            const changedFilter = () => {
              if (displayOnlyChanged && variant === 'submit') {
                return !item.initSubmit;
              }
              if (displayOnlyChanged && variant === 'available') {
                return item.initSubmit;
              }

              return true;
            };

            return includesSearch && changedFilter();
          },
          (item) => {
            const keyToRender = item[String(accessor) as keyof typeof item] as string;
            const status = item.initSubmit;
            const option = setOption(status);

            return (
              <div
                onMouseOver={() => setHoveredOption(keyToRender)}
                onFocus={() => setHoveredOption(keyToRender)}
                onMouseLeave={() => setHoveredOption('')}
                onClick={() => {
                  if (disabled) return;
                  onOptionClick(item);
                }}
                className={optionClasses}
                key={keyToRender}
              >
                <span className={option.textClasses}>
                  {keyToRender} <span className="im-add-remove-list-option-suffix">{option.getSuffix()}</span>
                </span>
                {hoveredOption === keyToRender && !disabled && (
                  <div className="im-add-remove-hover-suffix">({type.hoverOption(status)})</div>
                )}
              </div>
            );
          }
        )}
      </Container>
    </div>
  );
}
