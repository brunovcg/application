import { ReactNode } from 'react';

export type LisProps = { lines: { text: string | ReactNode; id: number | string }[]; className?: string };
