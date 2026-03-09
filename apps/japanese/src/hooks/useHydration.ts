import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

export function useHydration() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
