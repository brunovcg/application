import { useEffect, useMemo, useState } from 'react';
import { SupportConfigs } from '../../../configs';

const { mobileBreakpoint, desktopMinBreakpoint } = SupportConfigs.resolutions;

const getDimensions = () => ({ width: document.body.clientWidth, height: document.body.clientHeight });

export default function useDevice() {
  const [windowDimensions, setWindowDimensions] = useState(getDimensions());

  const isTouchScreenDevice = useMemo(
    () =>
      RegExp(/Android/i).exec(navigator.userAgent) ||
      RegExp(/webOS/i).exec(navigator.userAgent) ||
      RegExp(/iPhone/i).exec(navigator.userAgent) ||
      RegExp(/iPad/i).exec(navigator.userAgent) ||
      RegExp(/iPod/i).exec(navigator.userAgent) ||
      RegExp(/BlackBerry/i).exec(navigator.userAgent) ||
      RegExp(/Windows Phone/i).exec(navigator.userAgent),
    []
  );

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      setWindowDimensions(getDimensions());
    });

    resizeObserver.observe(document.body);

    return () => resizeObserver.disconnect();
  }, []);

  const { width, height } = windowDimensions;
  const numberMobileBreakpoint = mobileBreakpoint.substring(0, mobileBreakpoint.length - 2);
  const numberMinDesktopBreakpoint = mobileBreakpoint.substring(0, desktopMinBreakpoint.length - 2);

  const isMobile = useMemo(() => width <= Number(numberMobileBreakpoint), [width]);
  const hasMinDesktopViewport = useMemo(() => width > Number(numberMinDesktopBreakpoint), [width]);

  return { width, height, isMobile, hasMinDesktopViewport, isTouchScreenDevice };
}
