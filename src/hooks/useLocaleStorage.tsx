import { Dispatch, SetStateAction, useEffect, useState } from "react";

function useSessionStorage<S = undefined>(
  initialValue: S | (() => S),
  key: string
): [S, Dispatch<SetStateAction<S>>] {
  const [value, setValue] = useState<S>(() => {
    const valueSession = sessionStorage.getItem(key);
    if (!valueSession) {
      return initialValue instanceof Function ? initialValue() : initialValue;
    }
    return JSON.parse(valueSession);
  });

  useEffect(() => {
    const newValueSession = JSON.stringify(value);
    sessionStorage.setItem(key, newValueSession);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return [value, setValue];
}

export default useSessionStorage;
