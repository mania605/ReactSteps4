import { motion } from 'framer-motion';
//아래와 같이 부수효과(Side Effect)를 발생시키지 않는 순수함수(Pure Function)형태로 제작하는 것이 권장사항
//부수효과: setTimeout, DOM, fetch등 web api에 의존함으로서 비동기등의 예상치못한 결과값을 야기시키는 효과
//순수함수: 위와 같은 부수효과를 발생시키지 않는 형태의 함수
//리액트는 순수함수를 권장 : 브라우저의 개입없이 리액트 자체적으로 메모리단에서 모든 데이터를 관리하기때문에 데이터추적, 성능면에서 유리하고 리액트의 컨셉과도 부합됨
//props (children:텍스트값, style:커스텀할 스타일객체, interval:시간차간격, delay:지연시간, duration:각 문자마다 적용할 모션시간)

//YoutubeDetail 상세페이지 컴포넌트에서는 제목 문자값이 바로 전달되는 것이 아닌 유튜브 데이터를 먼저 fetching처리한 이후
//객체에서 추출된 문자데이터를 보내기 때문에 초기에 children props에 전달되는 값이 undefined라서 오류 발생
//해결 방법은 혹시 children값이 없을 경우를 대비해 디폴트 파라미터로 빈 문자열 지정
export default function SplitText({ children = '', style, interval = 0.1, delay = 0, duration = 0.3 }) {
	//내부적으로 빈배열 생성해서 children으로 전달받은 문자열을 반복돌면서 배열에 담아줌
	const textArr = [];
	for (const letter of children) textArr.push(letter);

	//부모요소를 통해서 동적으로 반복생성될 자식요소인 span에 적용할 서식 관련 스타일
	//서식 외의 스타일구문은 자식요소로 자동 상속이 안됨 (marginBottom은 span에 상속이 안 먹고 부모요소인 h2에만 적용됨)
	const titStyle = {
		marginBottom: 50,
		fontWeight: 100,
		fontSize: '6vmax',
		fontFamily: 'raleway',
		lineHeight: 1,
		color: '#333',
		...style
	};

	//motion 컴포넌트에 적용할 옵션정보를 객체형태로 구조화한뒤 다시 비구조화할당으로 추출
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
