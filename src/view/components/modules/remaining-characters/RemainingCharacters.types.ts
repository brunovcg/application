import { SetStateAction } from 'react';

export type RemainingCharactersProps = {
  remainingCharacters: number;
  disabled?: boolean;
};

export type RemainingCharactersRef = {
  setRemainingChars: (value: SetStateAction<number>) => void;
};
