import { useEffect, useState } from 'react';
import { ButtonIcon, Icon, LoadingSpinner } from '../../../../components';
import StyledCountyToUpdate from './CountyToUpdate.styled';
import { countiesQueries } from '../../../../../apis/queries';
import { CountyToUpdateProps } from './CountyToUpdate.types';

const { useListCountiesByCustomerQuery } = countiesQueries;

export default function CountyToUpdate({ stateCounty, apply, onApply, customerUsername }: CountyToUpdateProps) {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { customerCounties } = useListCountiesByCustomerQuery(customerUsername);

  const handleApply = () => {
    setLoading(true);
    onApply(customerCounties.find((item) => item.stateCounty === stateCounty)?.id as number)
      .then(() => setSuccess(true))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  const iconRenderer = () => {
    if (success) {
      return <Icon icon="done" weight="fill" variant="valid" />;
    }

    if (loading) {
      return <LoadingSpinner size="tiny" />;
    }

    if (error) {
      return (
        <div className="im-county-to-update-error">
          <ButtonIcon icon="retry" iconWeight="bold" onClick={handleApply} />
          <Icon icon="cancel" weight="fill" variant="error" size="tiny" />
        </div>
      );
    }

    if (!apply) {
      return (
        <div className="im-county-to-update-ready">
          <Icon icon="pause" />
          <p>Ready</p>
        </div>
      );
    }

    return null;
  };

  useEffect(() => {
    if (apply) {
      handleApply();
    }
  }, [apply]);

  return (
    <StyledCountyToUpdate className="im-county-to-update">
      <div>{stateCounty}</div>
      {iconRenderer()}
    </StyledCountyToUpdate>
  );
}
