export type PopperSide = 'top' | 'right' | 'bottom' | 'left';

export type UsePopperProps = {
  side?: PopperSide;
  position?: 'absolute' | 'fixed';
  distance?: number;
  skidding?: number;
};
