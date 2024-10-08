export default function useSplitText() {
	return (ref, option) => {
		if (!ref) return console.error('첫번째 인수로는 참조객체값이 와야 됩니다.');
		const default_option = { interval: 0, delay: 0 };
		//불변성을 유지하면서 2개의 객체를 합쳐서 새로운 객체 반환하는 패턴
		//{...객체1, ...객체2}
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
