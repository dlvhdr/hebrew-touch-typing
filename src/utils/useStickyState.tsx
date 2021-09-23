import {useEffect, useState} from 'react';

export const useStickyState = <T extends unknown>(
  defaultValue: T,
  key: string,
): [T, (value: T) => void] => {
  const [value, setValue] = useState<T>(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
