import { useRef } from 'react';
export default function useThrottle(func, interval = 300) {
	const ref_timer = useRef(null);
	return () => {
		//만약 setTimeout으로 부터 반환받은 timer값이 있으면 강제 중지하면서 아래쪽의 중복 setTimeout호출 방지
		if (ref_timer.current) return;
		//setTimeout이 실행되자마자 timer에 반환값 담음
		ref_timer.current = setTimeout(() => {
			//무조건 interval시간 이후에 연결된 콜백함수 호출됨
			func();
			//콜백함수 호출시 타이머 값 제거해서 setTimeout 다시 호출할 수 있도록 처리
			ref_timer.current = null;
		}, interval);
	};
}
/*
  특정 함수를 인수로 받아서 throttle기능을 적용처리해서
  전달된 원본함수에 기능을 확장해서 새로운 함수를 반환처리 (고차함수: HOF High Order Function)
  useThrottle로직 최종 정리
 
   - 처음 setTimeout이 한번 실행 즉시 반환값을 timer에 담음 
  - 반복되는 setTimeout요청이 들어와도 상단에 있는 if문에 의해서 무시됨 (아직 timer에 반환값이 담겨있기 때문)
  - interval이후에 callback실행됨과 동시에 timer값을 물리적으로 제거 (비로서 새로운 setTimeout요청 수행가능)
  - 결국 이벤트가 1초에 60번씩 빈번하게 발생하더라도 interval에 지정된 0.3초 간격마다 함수호출을 제한가능
*/