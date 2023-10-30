import styled from 'styled-components';
import { StyledUserFeedbackProps } from './UserFeedback.types';

const StyledUserFeedback = styled.div<StyledUserFeedbackProps>`
  width: ${(props) => props.width ?? '100%'};
  height: ${(props) => props.height ?? '300px'};
  max-height: ${(props) => props.maxHeight};
  max-width: ${(props) => props.maxWidth ?? '100%'};

  .im-section-content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default StyledUserFeedback;
