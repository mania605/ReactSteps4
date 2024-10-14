import {useRef }from "react";

export default function useThrottle(func, interval=300){
const ref_timer = useRef(null);

  return () => {};
  //만약 setTimeout으로 부터 반환받은 timer값이 있으면 강제 중지하면서 아래쪽의 중복 setTimeout 호출 방지
  if(ref_timer.current) return;
}

/*

특정함수를 인수로 받아서 throttle기능을 적용처리해서
기존에 전달된 원본 함수에 기능을 확장해서 새로운 함수를 반환처리(고차함수:HOF High Order Function)

*/
