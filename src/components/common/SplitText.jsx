import { useRef } from 'react';

export default function SplitText({ children }) {
	const textArr = [];
	for (const letter of children) textArr.push(letter);
	console.log(textArr);

	const baseStyle = { fontWeight: 100, fontSize: '6max', lineHeight: 1, color: '#333', marginBottom: 50 };

	return (
		<h2 style={baseStyle}>
			{textArr.map((el, idx) => (
				<span key={idx}>{el}</span>
			))}
		</h2>
	);
}

/*
	미션 (1시 30분까지 제작)
	- 기존 useSplitText라는 커스텀 훅으로 문자열 반복생성하는 문제점 파악 (리얼돔 제어, useEffect를 통해 리얼돔에 다시 클래스를 제어하는 모션 형태(비권장 방식)  )
	- 아예 span요소르 분리된 새로운 가상돔을 반환하는 형태로 컴포넌트 함수 제작 (리액트 개발 의도에 부합됨)
	- 순서1 : children으로 전달받은 문자값을 컴포넌트 내부에서 배열로 변환
	- 순서2 : 변환된 문자열 배열을 반복돌며 span가상돔 요소로 반복 생성
	- 순서3 : 반복생성될때 scss파일이 아닌 스타일 객체를 직접 연결해 재사용성 올림
	- 순서4 : props를 전달하여 지연시간, 스타일 정보등을 호출시에 정할수 있도록 개발 편의성 고도화
*/
