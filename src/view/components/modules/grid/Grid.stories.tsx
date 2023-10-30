import { Grid } from '../..';
import { StoryObj } from '@storybook/react';
import { GridTemplateArgs } from './Grid.types';

const meta = {
  title: 'Components/Grid',
  component: Grid,
  args: {
    columns: [
      { component: 'First column', accessor: 'one' },
      { component: 'Second column', accessor: 'two' },
      { component: 'Third column', accessor: 'three' },
      { component: 'Fourth column (Template)', accessor: 'four', template: ({ value }: GridTemplateArgs) => 'template ' + value },
    ],
    rows: [
      { id: 1, one: 'row 1 column 1', two: 'row 1 column 2', three: 'row 1 column 3', four: 'row 1 column 4' },
      { id: 2, one: 'row 2 column 1', two: 'row 2 column 2', three: 'row 2 column 3', four: 'row 2 column 4' },
      { id: 3, one: 'row 3 column 1', two: 'row 3 column 2', three: 'row 3 column 3', four: 'row 3 column 4' },
    ],
    search: true,
    width: '800px',
    height: '400px',
  },
};

export default meta;

type Story = StoryObj<typeof Grid>;

const Template: Story = {
  render: (args) => <Grid {...args} />,
};

export const Control = {
  ...Template,
};
