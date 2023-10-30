import { Icon, Tooltip } from '../..';
import { StoryObj } from '@storybook/react';
import { IconProps, iconSizes, iconWeight } from './Icon.types';
import { RefAttributes } from 'react';
import { ClipboardHelper } from '../../../../utils/helpers';
import { icons } from './Icon.map';

const mappedIcon = Object.keys(icons);

const RenderTemplate = (args: IconProps & RefAttributes<HTMLSpanElement>) => {
  const { copy } = ClipboardHelper;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', flexWrap: 'wrap' }}>
        {mappedIcon.map((icon) => (
          <Tooltip
            content="Copy"
            key={icon}
            trigger={
              <div
                onClick={() => copy(icon)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid lightgrey',
                  padding: '10px',
                  gap: '10px',
                  width: '100px',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <Icon {...args} icon={icon as keyof typeof icons} />
                <p style={{ fontSize: '9px', color: 'grey' }}>{icon}</p>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
};

const meta = {
  title: 'Components/Icon',
  component: Icon,
  args: { size: 'small', variant: 'regular', error: false, disabled: false },
  argTypes: {
    size: {
      control: 'select',
      options: iconSizes,
    },
    error: {
      control: 'boolean',
    },
    variant: {
      control: 'select',
      options: iconWeight,
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

const Template: Story = {
  render: RenderTemplate,
};

export const Control = {
  ...Template,
};
