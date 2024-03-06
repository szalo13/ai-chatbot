import { useEffect, useRef } from "react";

export const useRefWithPrevious = (initialValue: any) => {
  const ref = useRef(initialValue);
  const prevRef = useRef(initialValue);

  useEffect(() => {
    prevRef.current = ref.current;
    ref.current = initialValue;
  }, [initialValue]);

  return [ref, prevRef];
};
