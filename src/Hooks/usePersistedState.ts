import { useState, useEffect } from "react";
import { getItem, setItem } from "../Utils/localStorage";

export function usePersistedState<T>(key: string, initialValue: T): [T, (val: T) => void] {
  const [value, setValue] = useState<T>(() => {
        const item = getItem(key);
        return (item as T) || initialValue;
      });
    
      useEffect(() => {
        setItem(key, value);
      }, [key, value]);

      return[value, setValue] as const ;
}