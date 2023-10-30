import { useEffect, useState } from 'react';
import StyledCountDown from './CountDown.styled';
import { CountDownProps } from './CountDown.types';
import { ClassNameHelper, DateTimeHelper } from '../../../../utils/helpers';

export default function CountDown({ seconds, timeUpCallback, blink = false, size = 'medium', variant = 'primary', label }: CountDownProps) {
  const [timer, setTimer] = useState(seconds);

  const classes = ClassNameHelper.conditional({ ['im-countdown']: true, [`im-countdown-${size}`]: size });

  useEffect(() => {
    const reduceTimer = setInterval(() => {
      if (timer) {
        setTimer((state) => state - 1);
      } else {
        timeUpCallback?.();
      }
    }, 1000);

    return () => clearInterval(reduceTimer);
  }, []);

  return (
    <StyledCountDown className={classes} blink={blink} variant={variant}>
      {label && `${label}: `}
      {DateTimeHelper.formatTimeFromSeconds(timer)}
    </StyledCountDown>
  );
}
