import { Section } from '../../../../../../../../components';
import { CustomerPreferencesContainerProps } from './CustomerPreferencesContainer.types';
import './CustomerPreferencesContainer.scss';
import { ClassNameHelper } from '../../../../../../../../../utils/helpers';

const { conditional } = ClassNameHelper;

export default function CustomerPreferencesContainer({ label, children, className }: CustomerPreferencesContainerProps) {
  const classes = conditional({
    ['im-customer-preferences-container']: true,
    [className as string]: !!className,
  });

  return (
    <Section sectionTitle={label} contentClassName={classes}>
      {children}
    </Section>
  );
}
