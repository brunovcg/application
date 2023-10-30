import { StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import AddressDetailDialog from './AddressDetailDialog';

const queryClient = new QueryClient();

const meta = {
  title: 'Components/DialogGroup/AddressDetailDialog',
  component: AddressDetailDialog,
  args: {
    data: {
      attomId: 1,
      city: 'city',
      county: 'county',
      createdDate: new Date(),
      fips: 1,
      id: 1,
      livingArea: 1,
      lotSize: 1,
      ltv: 1,
      mailingAddress: 'mailing address',
      mailingCity: 'mailing city',
      mailingState: 'mailing state',
      mailingStreetName: 'mailing street name',
      mailingUnitNumber: null,
      mailingUnitType: null,
      mailingZip: 'mailing zip',
      modifiedDate: new Date(),
      motivationPointNames: 'motivation points',
      motivationPoints: null,
      mpNames: null,
      mpNamesAsList: [],
      owner2FirstName: 'owner2 first name',
      owner2LastName: 'owner2 last name',
      owner2MiddleName: null,
      ownerFirstName: 'owner first name',
      ownerLastName: 'owner last name',
      ownerMiddleName: null,
      ownerOccupied: 'occupied',
      ownerType: 'type',
      propertyAddress: 'address',
      propertyType: 'type',
      rank: null,
      skipTrace: null,
      state: 'state',
      stopMailingFlag: 'stop mailing',
      streetName: 'street name',
      taxId: 'tax-id',
      totalValue: 1,
      unitNumber: null,
      unitType: null,
      yearsOld: 1,
      yrsOwned: 1,
      zipCode: '00000',
    },
  },
};

export default meta;

type Story = StoryObj<typeof AddressDetailDialog>;

const Template: Story = {
  render: (args) => (
    <QueryClientProvider client={queryClient}>
      <div style={{ maxWidth: '800px' }}>
        <AddressDetailDialog {...args} />
      </div>
    </QueryClientProvider>
  ),
};

export const Control = {
  ...Template,
};
