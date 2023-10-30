import { useMemo, useRef } from 'react';
import { ClassNameHelper } from '../../../../utils/helpers';
import StyledText from './Text.styled';
import { TextProps } from './Text.types';
import Constants from '../../../../utils/constants/Constants';
import InjectedHTML from '../injected-html/InjectedHTML';

const { HTTP_LINK } = Constants.REGEX;

export default function Text({
  text,
  maxLines,
  className,
  height,
  width,
  variant,
  size = 'medium',
  align,
  italic,
  bold,
  convertLinks = true,
}: TextProps) {
  const classes = ClassNameHelper.conditional({
    ['im-text']: true,
    [`${className}`]: !!className,
    [`im-text-variant-${variant}`]: !!variant,
    [`im-text-size-${size}`]: !!size,
  });

  const textRef = useRef<HTMLParagraphElement>(null);

  const isClamped = textRef.current ? textRef.current?.scrollHeight > textRef.current?.offsetHeight : null;

  const formattedText = useMemo(() => {
    if (!text) {
      return '';
    }
    if (!convertLinks) {
      return text;
    }

    return (
      <InjectedHTML
        html={text.replace(HTTP_LINK, (link) => `<a class="im-text-anchor" href="${link}" target="_blank" rel="noreferrer">${link}</a>`)}
      />
    );
  }, [text]);

  return (
    <StyledText
      className={classes}
      data-testid="im-text"
      height={height}
      width={width}
      maxLines={maxLines}
      align={align}
      italic={italic}
      bold={bold}
      showMore={!!isClamped}
      variant={variant}
    >
      <div className="im-text-wrapper">
        <p ref={textRef} className="im-text-content">
          {formattedText}
        </p>
      </div>
    </StyledText>
  );
}
