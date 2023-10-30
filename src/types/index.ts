import { ReactNode } from 'react';

import Constants from '../utils/constants/Constants';

export type SetTimeout = ReturnType<typeof setTimeout>;

export type UnknownObject = { [key: string]: string | number | null | undefined | unknown[] | Date | UnknownObject };

export type WithPrefix<T extends string> = `${T}${string}`;

export type ChildrenProp = { children: ReactNode };

export type EventKey = (typeof Constants.KEYBOARD.KEYS)[number];

export type ColorsVariant = keyof typeof Constants.COLORS;

export type BackgroundVariant = keyof typeof Constants.BACKGROUND_COLORS;

export type Pending = 'P';

export type Completed = 'C';

export type Ascending = 'asc' | 'ASC';

export type Descending = 'desc' | 'DESC';
