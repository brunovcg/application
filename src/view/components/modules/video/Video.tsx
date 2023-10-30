import { useState } from 'react';
import StyledVideo from './Video.styled';
import { VideoProps } from './Video.types';
import LoadingSpinner from '../loading-spinner/LoadingSpinner';
import { ClassNameHelper } from '../../../../utils/helpers';

export default function Video({ src, title, className, allowFullScreen = true, autoplay = true, width, height, ...rest }: VideoProps) {
  const [loaded, setLoaded] = useState(false);

  const classes = ClassNameHelper.conditional({
    ['im-video']: true,
    [`${className}`]: !!className,
  });

  return (
    <StyledVideo width={width} height={height} className={classes}>
      <iframe
        onLoad={() => setLoaded(true)}
        src={src}
        title={title}
        allowFullScreen={allowFullScreen}
        className="im-video"
        allow={autoplay ? 'autoplay' : ''}
        {...rest}
      />

      {!loaded && (
        <div className="im-loading-wrapper">
          <LoadingSpinner className="im-loading-video" message size="tiny" />
        </div>
      )}
    </StyledVideo>
  );
}
