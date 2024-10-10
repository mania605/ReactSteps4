import { motion } from 'framer-motion';

export default function SplitText({ children, style, interval = 0.1, delay = 0, duration = 0.3 }) {
	const textArr = [];
	for (const letter of children) textArr.push(letter);

	const titStyle = {
		display: 'inline-block',
		marginBottom: 50,
		fontWeight: 100,
		fontSize: '6vmax',
		fontFamily: 'raleway',
		lineHeight: 1,
		color: '#333',
		...style
	};

	const { init, active } = {
		init: { scale: 2, opacity: 0 },
		active: { scale: 1, opacity: 1 }
	};

	return (
		<h2 style={titStyle}>
			{textArr.map((el, idx) => (
				<motion.span
					style={{ display: 'inline-block' }}
					key={idx}
					initial={init}
					animate={active}
					transition={{ duration: duration, delay: interval * idx + delay }}>
					{el}
				</motion.span>
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
