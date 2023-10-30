import { ControlledTable } from '../../..';
import { StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/ControlledTable',
  component: ControlledTable,
  args: {
    columns: [
      { Header: 'First column', accessor: 'one', width: 100, Filter: true },
      { Header: 'Second column', accessor: 'two', disableSortBy: true },
      { Header: 'Third column', accessor: 'three', alignment: 'left' },
      { Header: 'Fourth column (Template)', accessor: 'four', Cell: ({ value }: { value: string }) => 'template ' + value },
    ],
    data: [
      { id: 1, one: 'row 1 column 1', two: 'row 1 column 2', three: 'row 1 column 3', four: 'row 1 column 4' },
      { id: 2, one: 'row 2 column 1', two: 'row 2 column 2', three: 'row 2 column 3', four: 'row 2 column 4' },
      { id: 3, one: 'row 3 column 1', two: 'row 3 column 2', three: 'row 3 column 3', four: 'row 3 column 4' },
      { id: 4, one: 'row 4 column 1', two: 'row 4 column 2', three: 'row 4 column 3', four: 'row 4 column 4' },
      { id: 5, one: 'row 5 column 1', two: 'row 5 column 2', three: 'row 5 column 3', four: 'row 5 column 4' },
      { id: 6, one: 'row 6 column 1', two: 'row 6 column 2', three: 'row 6 column 3', four: 'row 6 column 4' },
      { id: 7, one: 'row 7 column 1', two: 'row 7 column 2', three: 'row 7 column 3', four: 'row 7 column 4' },
      { id: 8, one: 'row 8 column 1', two: 'row 8 column 2', three: 'row 8 column 3', four: 'row 8 column 4' },
      { id: 9, one: 'row 9 column 1', two: 'row 9 column 2', three: 'row 9 column 3', four: 'row 9 column 4' },
      { id: 10, one: 'row 10 column 1', two: 'row 10 column 2', three: 'row 10 column 3', four: 'row 10 column 4' },
      { id: 11, one: 'row 11 column 1', two: 'row 11 column 2', three: 'row 11 column 3', four: 'row11 column 4' },
    ],
    search: true,
    width: '800px',
    height: '400px',
    loading: false,
    paginate: [10, 20, 30, 'All'],
    allowExportExcel: true,
    allowExportCSV: true,
    label: 'This is IM Table Label',
    filename: 'table-file',
    info: 'This is a table Info',
    showGlobalFilter: true,
    showColumnFilter: true,
    stickHeader: true,
    tableHeight: '250px',
    noData: 'This is a no Data Template',
  },
  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },
    onResetFilters: {
      table: {
        disable: true,
      },
    },
    onRowClick: {
      table: {
        disable: true,
      },
    },
    customHeader: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ControlledTable>;

const Template: Story = {
  render: (args) => <ControlledTable {...args} />,
};

export const Control = {
  ...Template,
};
