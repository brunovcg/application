import { icons } from '../../../../view/components/modules/icon/Icon.map';
import { ClipboardHelper, DataHelper } from '../../../helpers';
import { Tooltip, Icon, InputText, Selector, Divider } from '../../../../view/components';
import StyledDebugIcons from './DebugIcons.styled';
import { useState } from 'react';
import Constants from '../../../constants/Constants';
import { IconSize, IconWeight, iconSizes, iconWeight } from '../../../../view/components/modules/icon/Icon.types';
import { ColorsVariant } from '../../../../types';

const { COLORS } = Constants;
const mappedIcon = Object.keys(icons);
const { copy } = ClipboardHelper;
const { filterMap } = DataHelper;

export default function DebugIcons() {
  const [variant, setVariant] = useState<ColorsVariant>('primary');
  const [weight, setWeight] = useState<IconWeight>('fill');
  const [size, setSize] = useState<IconSize>('medium');
  const [filter, setFilter] = useState('');

  const selectorProps = {
    allowSearch: false,
    width: '150px',
    allowClear: false,
  };

  return (
    <StyledDebugIcons className="im-debug-icons" variant={variant}>
      <div className="im-debug-dialog-header">
        <InputText
          label="Search"
          placeholder="Search for icons"
          onChange={(value) => setFilter(value.toLowerCase())}
          autoComplete="off"
          width="200px"
        />
        <Selector
          label="Size"
          options={iconSizes as unknown as string[]}
          onSelect={(value) => setSize(value[0] as IconSize)}
          initValue={[size as string]}
          {...selectorProps}
        />
        <Selector
          label="Variant"
          options={Object.keys(COLORS)}
          onSelect={(value) => setVariant(value[0] as ColorsVariant)}
          initValue={[variant]}
          {...selectorProps}
        />
        <Selector
          label="Weight"
          options={iconWeight as unknown as string[]}
          onSelect={(value) => setWeight(value[0] as IconWeight)}
          initValue={[weight]}
          {...selectorProps}
        />
      </div>
      <Divider margin="0" />
      <div className="im-debug-icons-container">
        {filterMap(
          mappedIcon,
          (icon) => icon.toLowerCase().includes(filter),
          (icon) => (
            <Tooltip
              content="Copy"
              key={icon}
              trigger={
                <div className="im-debug-icons-item" onClick={() => copy(icon)}>
                  <Icon icon={icon as keyof typeof icons} variant={variant} weight={weight} size={size} />
                  <p className="im-debug-icons-name">{icon}</p>
                </div>
              }
            />
          )
        )}
      </div>
    </StyledDebugIcons>
  );
}
