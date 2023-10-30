import { ForwardedRef } from 'react';

export type InjectedHTMLProps = { html: string; className?: string; onClick?: () => void };

export type InjectedHTMLRef = ForwardedRef<HTMLSpanElement>;
