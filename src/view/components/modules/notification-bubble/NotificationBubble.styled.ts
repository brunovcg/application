import styled from 'styled-components';
import { NotificationBubbleStyledProps } from './NotificationBubble.types';
import Constants from '../../../../utils/constants/Constants';

const StyledNotificationBubble = styled.div<NotificationBubbleStyledProps>`
  min-width: 18px;
  height: 18px;
  font-size: 11px;
  background-color: ${(props) => (props.variant ? Constants.BACKGROUND_COLORS[props.variant] : Constants.BACKGROUND_COLORS.error)};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--typeface-white-color);
  font-weight: bold;
  position: absolute;
  padding-top: 1px;
  top: 0;
  right: 0;
  margin: ${(props) => props.margin};

  &.im-notification-large {
    width: 35px;
    border-radius: 30px;
  }

  &.im-no-notifications {
    display: none;
  }
`;

export default StyledNotificationBubble;
