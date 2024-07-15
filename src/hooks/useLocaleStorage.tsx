import { Dispatch, SetStateAction, useEffect, useState } from "react";

function useLocalStorage<S = undefined>(initialValue: S | (() => S), key: string): [S, Dispatch<SetStateAction<S>>] {
  const [value, setValue] = useState<S>(() => {
    const valueLocal = localStorage.getItem(key);
    if (!valueLocal) {
      if (initialValue instanceof Function) return initialValue();
      return initialValue;
    }
    return JSON.parse(valueLocal);
  });

  useEffect(() => {
    const newValueLocal = JSON.stringify(value);
    localStorage.setItem(key, newValueLocal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return [value, setValue];
}

export default useLocalStorage;