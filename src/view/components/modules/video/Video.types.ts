export type StyledVideoProps = {
  width?: string;
  height?: string;
};

export type VideoProps = StyledVideoProps & {
  src: string;
  title: string;
  allowFullScreen?: boolean;
  autoplay?: boolean;
  className?: string;
};
