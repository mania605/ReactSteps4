import { motion } from 'framer-motion';

export default function Content({ children, duration = 1, delay = 0, customMotion }) {
	//컨텐츠영역에 기본적으로 적용될 모션 관련 디폴트 정보객체 준비
	const defaultMotion = {
		init: { opacity: 0, y: 200 },
		active: { opacity: 1, y: 0 },
		end: { opacity: 0, y: 200, transition: { delay: 0 } }
	};

	//호출시 props로 전달되는 커스텀 옵셔객체가 있으면 기존 디폴트 객체를 덮어쓰기한 뒤, 비구조화할당으로 바로 추출
	const { init, active, end } = { ...defaultMotion, ...customMotion };

	return (
		// 커스텀 모션옵션이 적용된 값을 바로 JSX요소에 적용
		<motion.div className='content' initial={init} animate={active} exit={end} transition={{ duration: duration, delay: delay }}>
			{children}
		</motion.div>
	);
}

/*
  미션 (3시 40분까지)
  - 문제점 인식 :각 페이지마다 동일한 Content 컴포넌트를 적용해서 모든 페이지는 동일한 모션을 공유하고 있어서 UX적으로 단조로움
  - 해결방법 : Content 호출시 전용 모션정보를 props로 전달해서 내부적으로 옵션객체를 합친 뒤 적용
  - 개선된 사항 : 위의 이슈해결을 통해서 미니 사용성 테스트를 자체적으로 진행해본 결과 기능 UX개선후 웹앱의 사용자 체류시간이 늘어난 것을 확인 (테스트 증빙 데이터 첨부)
*/
