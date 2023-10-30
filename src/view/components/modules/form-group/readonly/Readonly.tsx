import { Container, LoadingSpinner, Tooltip } from '../../..';
import { ClassNameHelper } from '../../../../../utils/helpers';
import StyledReadonly from './Readonly.styled';
import { ReadonlyProps } from './Readonly.types';

export default function Readonly({ text, label, className, width, dataTestId, flexGrow, loading, enabledTooltip = true }: ReadonlyProps) {
  const classes = ClassNameHelper.conditional({
    ['im-readonly']: true,
    [className as string]: !!className,
  });

  const formatTestId = () => {
    if (dataTestId) {
      return dataTestId;
    }
    return 'im-readonly-value';
  };

  const renderer = () => {
    if (enabledTooltip) {
      return (
        <Tooltip
          content={text}
          trigger={
            <div className="im-readonly-content" data-testid={formatTestId()}>
              {text}
            </div>
          }
          help
        />
      );
    }
    return text;
  };

  return (
    <StyledReadonly flexGrow={flexGrow} width={width} className={classes}>
      <Container className="im-readonly-display" variant="regular" label={label} height="100%">
        {!loading && renderer()}
        {loading && <LoadingSpinner size="tiny" />}
      </Container>
    </StyledReadonly>
  );
}
