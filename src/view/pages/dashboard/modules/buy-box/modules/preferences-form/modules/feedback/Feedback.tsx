import { useTranslation } from 'react-i18next';
import { UserFeedback } from '../../../../../../../../components';
import { FeedbackProps } from './Feedback.types';
import { useTranslationPath } from '../../../../../../../../../utils/hooks';
import { countiesQueries } from '../../../../../../../../../apis/queries';
import { useContext } from 'react';
import { UserSessionContext } from '../../../../../../../../../contexts/modules/user-session/UserSessionContext';

const { useListCountiesByCustomerQuery } = countiesQueries;

export default function Feedback({ loading, customerSelected, countySelected, username }: FeedbackProps) {
  const { t } = useTranslation();
  const path = useTranslationPath('Pages.Dashboard.BuyBox.PreferencesForm.UserFeedback');
  const { customerCounties, customerCountiesIsLoading } = useListCountiesByCustomerQuery(username);
  const { sessionUser } = useContext(UserSessionContext);

  const feedback = () => {
    if (loading || customerCountiesIsLoading) {
      return { variant: 'loading' as const };
    } else if (!customerSelected && !sessionUser.isCustomer) {
      return { variant: 'warning' as const, message: t(path('SelectCustomer')) };
    } else if (customerSelected && !customerCounties.length) return { variant: 'error' as const, message: t(path('NoMatches')) };
    else if (!countySelected) return { variant: 'warning' as const, message: t(path('SelectCounty')) };
    else {
      return null;
    }
  };

  return <UserFeedback message={feedback()?.message} variant={feedback()?.variant} />;
}
