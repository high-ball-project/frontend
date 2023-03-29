import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";
import * as nextRouter from "next/router";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import * as reactRouter from "react-router-dom";

import { queryStringToObject } from "../utils/queryStringUtils";

/**
 *
 * @param initialSearchParams
 * @param converter
 * @param prefix
 * @return {number, Dispatch<SetStateAction<number>>, number, Dispatch<SetStateAction<number>>, Record<string, any>,
 *   Dispatch<SetStateAction<Record<string, any>>>}
 */

function useApiPagination<
  T extends Record<"pageSize" | "current" | string, string | string[]>,
  V extends Record<keyof T, any>
>({
  initialSearchParams,
  converter,
  prefix,
}: {
  initialSearchParams?: T;
  converter?: (data: T) => V;
  prefix?: string;
} = {}): [
  number,
  Dispatch<SetStateAction<number>>,
  number,
  Dispatch<SetStateAction<number>>,
  ReturnType<(data: T) => V>,
  Dispatch<SetStateAction<T>>
] {
  prefix = prefix ?? "";
  const [searchParamsDom, setSearchParams] = process.env.VITE_TITLE
    ? reactRouter?.useSearchParams(initialSearchParams)
    : [undefined, undefined];
  const router = !process.env.VITE_TITLE ? nextRouter?.useRouter() : undefined;

  const searchParams = useMemo<URLSearchParams>(() => {
    if (searchParamsDom) return searchParamsDom as URLSearchParams;
    const search = new URLSearchParams();

    Object.entries(router?.query!).forEach(([key, value]) => {
      search.append(key, `${value}`);
    });
    return search;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [search, setSearch] = useState(
    converter
      ? () => converter(queryStringToObject(searchParams))
      : queryStringToObject(searchParams)
  );
  const [current, setCurrent] = useState(
    parseInt(searchParams.get(`${prefix}current`) ?? "1")
  );
  const [pageSize, setPageSize] = useState(
    parseInt(searchParams.get(`${prefix}pageSize`) ?? "20")
  );

  const searchKey = useMemo(
    () => [
      `${prefix}current`,
      `${prefix}pageSize`,
      ...Object.keys(initialSearchParams ?? {}),
    ],
    [prefix, initialSearchParams]
  );

  useEffect(() => {
    const newSearchParams = new URLSearchParams({
      ...Object.fromEntries(searchParams),
      ...Object.fromEntries(new URLSearchParams(window.location.search)),
    });

    Object.entries(search).forEach(([key, value]) => {
      if (searchKey.includes(key)) {
        newSearchParams.delete(key);
        if (Array.isArray(value))
          value.forEach((v) => newSearchParams.append(key, v));
        else newSearchParams.set(key, `${value}`);
      }
    });
    newSearchParams.set(`${prefix}current`, current.toString());
    newSearchParams.set(`${prefix}pageSize`, pageSize.toString());
    if (router) router.replace({ search: newSearchParams.toString() }).then();
    else if (setSearchParams)
      setSearchParams(newSearchParams, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, pageSize, current]);

  const setterWr = <S>(
    setter: Dispatch<SetStateAction<S>>
  ): Dispatch<SetStateAction<S>> => {
    return (value) => {
      setter(value);
      setCurrent(1);
    };
  };

  return [
    current,
    setCurrent,
    pageSize,
    setterWr(setPageSize),
    search,
    setterWr(setSearch),
  ];
}

export default useApiPagination;
