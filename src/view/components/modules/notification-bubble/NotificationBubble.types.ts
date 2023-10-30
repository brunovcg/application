import { BackgroundVariant } from '../../../../types';

export type NotificationBubbleStyledProps = {
  margin?: string;
  variant?: BackgroundVariant;
};

export type NotificationBubbleProps = NotificationBubbleStyledProps & {
  quantity: number;
};
