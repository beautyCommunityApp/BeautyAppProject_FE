// src/hooks/useDebounce.js
import { useState, useEffect } from "react";

/**
 * value가 바뀌어도 delay(ms) 동안 대기 후에야 debouncedValue가 업데이트됩니다.
 * 타이핑 중 불필요한 API 호출이나 렌더를 방지하는 데 유용합니다.
 *
 * @param {any} value   : 디바운스하려는 값 (예: 입력값)
 * @param {number} delay: 지연 시간(ms), 기본 300ms
 * @returns {any}       : 지연된 후의 값
 */
export default function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // value가 바뀔 때마다 타이머 시작
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // cleanup: value가 바뀌거나 컴포넌트 언마운트될 때 이전 타이머 취소
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
