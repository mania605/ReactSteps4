export default function useSplitText() {
	return (ref, interval = 0) => {
		let text = ref.current.innerText;
		let tags = '';
		let count = 0;

		for (let letter of text) {
			tags += `<span style='display:inline-block; transition-duration:0.5s; transition-delay:${
				count * interval
			}s'>${letter}</span>`;
			count++;
		}

		ref.current.innerHTML = tags;

		setTimeout(() => {
			ref.current.classList.add('on');
		}, 100);
	};
}
//미션 - 리턴되는 함수의 2번째 파라미터로 interval 시간값을 추가해서, 각각의 span요소에 interval만큼의 transition-delay적용
