export default function useDebounce(){
  return(
 
  );
}
/*
useDebounce의 로직 정리 및 사용 목적
-인수로 특정 상태값 전달받음
-내부적으로 setTimeout 호출해서 interval 시간 뒤에 콜백함수 호출
-interval이 끝나기 전 추가적인 이벤트 발생하면(설정시간동안 이벤트 혹은 함수호출이 없을때까지) 계속 interval시간을 초기화해서 계속 연결된 콜백함수 호출 미룸
-interval이 끝날동안 추가적인 이벤트 발생 없으면 비로소 콜백함수 호출해서 새로운 state 상태값 반환
*/