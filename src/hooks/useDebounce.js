import { useRef } from 'react';
import { useState } from 'react';
export default function useDebounce(state, interval = 500) {
	const [Debounced, setDebounced] = useState(state);
	const ref_timer = useRef(null);
	//interval시간이 끝나기도 전에 새로운 state가 전달되면
	//clearTimeout으로 반환값이 초기화
	//clearTimeout으로 timer값을 제거가 이닌 초기화처리하면 연결된 interval시간도 초기화됨
	clearTimeout(ref_timer.current);
	//위의 clearTimeout에 의해서 interval시간이 계속 초기화되면
	//연결된 콜백함수의 호출이 계속해서 연기됨 (초기화됨)
	//결국 해당 로직을 통해서 만약 기존 state변경 요청이 0.5초가 끝나기 전에 추가요청이 들어오면 계속 해당 시간을 초기화시키면서 새로운 state값 변경을 계속 지연
	//0.5초동안 새로운 요청이 들어오지 않으면 0.5초뒤에 해당 콜백함수 호출
	ref_timer.current = setTimeout(() => {
		setDebounced(state);
	}, interval);
	return Debounced;
}
 
/*
useDebounce의 로직 정리 및 사용 목적
-인수로 특정 상태값 전달받음
-내부적으로 setTimeout 호출해서 interval 시간 뒤에 콜백함수 호출
-interval이 끝나기 전 추가적인 이벤트 발생하면(설정시간동안 이벤트 혹은 함수호출이 없을때까지) 계속 interval시간을 초기화해서 계속 연결된 콜백함수 호출 미룸
-interval이 끝날동안 추가적인 이벤트 발생 없으면 비로소 콜백함수 호출해서 새로운 state 상태값 반환

useDebounce사용 목적
- 특정 시간동안 이벤트가 계속 발생하고 있으면 미리 설정한 시간동안 발생한 모든 이벤트 요청을 지연시켜
-반복적인 이벤트가 끝나야지만 최종적으로 제일 마지막 이벤트만 요청 받아 특정함수 호출

useDebounce 실 사용 예
-input에 값을 변경할 때마다 연결된 함수를 계속 반복호출하는 것이 아닌 입력값이 다 끝난 이후에 
연결되 함수를 한번만 호출하고 싶을 때
-만약 연결된 함수가 서버 데이터를 fetch해야 되는 무거운 로직의 함수일 경우 꽤 높은 성능향상을 유지할 수 있음
*/