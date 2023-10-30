import { Form, InputText } from '../../..';
import { StoryObj } from '@storybook/react';
import { object, string } from 'yup';

function onSubmit<PayloadType>(payload: PayloadType) {
  alert(JSON.stringify(payload));
}

const meta = {
  title: 'Components/FormGroup/Form',
  component: Form,
  args: {
    submitOnEnter: true,
    width: '300px',
    defaultSubmit: true,
    children: (
      <>
        <InputText name="name" label="Name" />
        <br />
        <InputText name="email" label="Email" />
      </>
    ),
    schema: object().shape({
      name: string().required('This is required'),
      email: string().required('This is required'),
    }),
    onSubmit,
    resettable: false,
    exclude: [],
  },
};

export default meta;

type Story = StoryObj<typeof Form>;

const Template: Story = {
  render: (args) => <Form {...args} />,
};

export const Control = {
  ...Template,
};
