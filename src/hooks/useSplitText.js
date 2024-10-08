//훅에서 함수를 리턴하는 이유
//여러 컴포넌트에서 동시다발적으로 호출해야 되는데
//특정 컴포넌트마다 호출될때 필요한 고유 정보값을 계속 유지해야됨
//클로저 환경 필요
//함수 안쪽에 지역변수를 만들고 그 지역변수를 활용하는 함수를 리턴하면
//렉시컬 스코프환경이 설정됨
//렉시컬 스코프 환경: 안쪽의 지역변수가 계속 값이 유지되는 현상

export default function useSplitText() {
	//내부적으로 current값을 직접 추출하기때문에 호출시 참조객체명만 전달
	return ref => {
		//인수로 전달받은 참조객체안의 요소의 텍스트만 가져옴
		let text = ref.current.innerText;
		//동적으로 생성될 태그문자열이 담길 빈 변수 생성
		let tags = '';

		//문자열을 반복돌면서 동적으로 <span>으로 감싸면서 문자열 쌓아나감
		for (let letter of text) {
			tags += `<span>${letter}</span>`;
		}

		//tag문자열이 완성되면 ref참소 요소 안쪽에 변경된 문자열 DOM구조 바꿔치기
		ref.current.innerHTML = tags;
	};
}
