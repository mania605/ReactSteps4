export default function useSplitText() {
	return ref => {
		let text = ref.current.innerText;
		let tags = '';

		for (let letter of text) {
			tags += `<span style='display:inline-block; transition-duration:0.5s;'>${letter}</span>`;
		}

		ref.current.innerHTML = tags;
	};
}
