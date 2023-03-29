import { DependencyList, EffectCallback, useEffect } from "react";

function useAsyncEffect(
  effect: () => Promise<void>,
  onDestroy?: ReturnType<EffectCallback> | DependencyList,
  deps?: DependencyList
) {
  const isCallback = typeof onDestroy === "function";
  const dep = isCallback ? deps : onDestroy;

  useEffect(() => {
    (async () => effect())();

    return isCallback ? onDestroy : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dep ?? undefined);
}

export default useAsyncEffect;
