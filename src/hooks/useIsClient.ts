import _isClient from "@utils/isClient";
import { useEffect, useState } from "react";

/**
 * useIsClient
 * nextjs일 때 window 객체가 없어서 발생하는 오류를 해결하기 위한 hook
 * @description
 * @return {boolean} 클라이언트 여부 확인
 */
function useIsClient(): boolean {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (_isClient) setIsClient(true);
  }, [isClient]);

  return isClient;
}

export default useIsClient;
