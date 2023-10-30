import { useEffect } from 'react';
import { Environment } from '../../../configs';

export default function useError({ condition, component, message }: { condition: boolean; component: string; message: string }) {
  useEffect(() => {
    if (condition && Environment.mode === 'development') {
      throw new Error(`${component}: ${message}`);
    }
  }, []);
}
