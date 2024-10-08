export default function useSplitText() {
	return (ref, option) => {
		if (!ref) return console.error('첫번째 인수로는 참조객체값이 와야 됩니다.');
		//만약 2번째 인수로 옵션 객체가 전달되지 않았을떄 대신 적용할 디폴트 옵션 객체지정
		const default_option = { interval: 0, delay: 0 };

		//디폴트옵션 객체에 뒤이어 전달될 옵션 객체를 덮어쓰기해서 새롭게합쳐진 옵션 객체 생성하는 구문
		//순서1 ...default_option으로 객체를 완전 복사해서 가져옴
		//순서2 ...option으로 해당 함수 호출시 전달한 객체를 다시 완전 복사해서 가져옴
		//순서3 각각 복사된 객체를 새로운 객체 안쪽에 {복사객체1, 복사객체2} 형태로 넣어줌
		//순서4 복사객체2가 복사객체1을 덮어쓰기 해서 새로운 옵션 객체 생성
		//예시 {interval: 0, delay:0},   {delay:1} 이라는 2개의 객체를 합치면
		// {interval:0, delay:1}이라는 새로운 객체 반환됨
		const result_option = { ...default_option, ...option };
		let text = ref.current.innerText;
		let tags = '';
		let count = 0;

		for (let letter of text) {
			tags += `<span style='display:inline-block; transition-duration:0.5s; transition-delay:${
				count * result_option.interval + result_option.delay
			}s'>${letter}</span>`;
			count++;
		}

		ref.current.innerHTML = tags;

		setTimeout(() => {
			ref.current.classList.add('on');
		}, 100);
	};
}
//미션 - 위와 같이 함수를 제작시 문제점
