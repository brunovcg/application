import StyledNotificationBubble from './NotificationBubble.styled';
import { NotificationBubbleProps } from './NotificationBubble.types';
import { ClassNameHelper } from '../../../../utils/helpers';

const { conditional } = ClassNameHelper;

function NotificationBubble({ quantity, margin = '0 0 0 18px', variant }: NotificationBubbleProps) {
  const displayQuantity = quantity > 99 ? '+99' : quantity;

  const classes = conditional({
    ['im-notification-bubble']: true,
    ['im-notification-large']: quantity > 99,
    ['im-no-notifications']: quantity <= 0,
  });

  return (
    <StyledNotificationBubble className={classes} margin={margin} variant={variant}>
      {displayQuantity}
    </StyledNotificationBubble>
  );
}

export default NotificationBubble;
