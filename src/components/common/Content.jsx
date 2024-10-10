import { motion } from 'framer-motion';

export default function Content({ children, duration = 1, delay = 0, customMotion }) {
	//컨텐츠영역에 기본적으로 적용될 모션 관련 디폴트 정보객체 준비
	//end 프로퍼티에 적용해야 될 딜레이 속성은 객체 합칠때 자동화 처리할 예정이므로
	//디폴트 속성값만 적용
	const defaultMotion = {
		init: { opacity: 0, y: 200 },
		active: { opacity: 1, y: 0 },
		end: { opacity: 0, y: 200 }
	};

	//우선은 스타일 객체만 병합해서 반환
	const combined = { ...defaultMotion, ...customMotion };

	//우항에서 기존 합쳐진 combined객체를 다시 deep copy처리한 뒤에 end프로퍼티에 delay값을 0으로 초기화하는 하위 프로퍼티만 다시 덮어씀
	//최종적으로 변경된 객체값에서 비구조화 할당 처리
	const { init, active, end } = { ...combined, end: { ...combined.end, transition: { delay: 0 } } };
	console.log(end);

	return (
		// 커스텀 모션옵션이 적용된 값을 바로 JSX요소에 적용
		<motion.div className='content' initial={init} animate={active} exit={end} transition={{ duration: duration, delay: delay }}>
			{children}
		</motion.div>
	);
}
