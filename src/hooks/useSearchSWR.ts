import { useRef } from "react";
import useSWR, { SWRConfiguration, SWRResponse } from "swr";
import { BareFetcher } from "swr/_internal";

import { getFetcher } from "../utils/fetcher";

/**
 * item list를 검색할 때 useSWR을 대체한다.
 * 기존 useSWR은 url이 바뀔 때 마다 isLoading이 true가 되어 queryParams가 바뀔 때,
 * 즉 검색 조건이 바뀔 때 마다 isLoading이 true가 되어 처음 호출하는 것으로 오해할 수 있다.
 * 하지만 useSearchSWR은 key에 관계 없이 isLoading이 해당 훅이 처음 요청할 때만 true를 반환한다.
 *
 * isKeyValidating는 key(URL)가 바뀌어 isValidating 일 때 true가 된다.
 * 그러므로 interval이나 mutate 등의 특수한 상황으로 인한 변화는 감지하지 않는다.
 *
 * @param {string} url
 * @param {SWRConfiguration<any, Error, BareFetcher<any>>?} config
 * @return {SWRResponse<any, Error>}
 */
function useSearchSWR<Data = any, Error = any>(
  url: string,
  config?: SWRConfiguration<Data, Error, BareFetcher<Data>>
): SWRResponse<Data, Error> & {
  isKeyValidating: boolean;
} {
  const loadedRef = useRef(false);
  const beforeUrlRef = useRef(url);
  const beforeDataRef = useRef<Data>();
  const res = useSWR<Data, Error>(url, getFetcher, config);
  const diffUrl = res.isValidating && url !== beforeUrlRef.current;

  if (!res.isValidating) beforeUrlRef.current = url;
  if (res.isLoading) loadedRef.current = true;
  if (res.data) beforeDataRef.current = res.data;

  return {
    ...res,
    // isLoading이 true일 경우는 이전에 이미 isLoading이 호출이 되었는지 확인하여 추가
    isLoading: res.isLoading ? !loadedRef.current : false,
    data: res.data || beforeDataRef.current,
    isKeyValidating: res.isValidating ? diffUrl : false,
  };
}

export default useSearchSWR;
