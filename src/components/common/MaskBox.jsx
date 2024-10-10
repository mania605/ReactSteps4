import { motion } from 'framer-motion';

export default function MaskBox({ children, duration = 0.5, delay = 0, color = '#000', style }) {
	//styles
	const frameStyle = {
		display: 'inline-block',
		position: 'relative',
		overflow: 'hidden'
	};
	const maskStyle = {
		width: '100%',
		height: '100%',
		position: 'absolute',
		top: 0,
		backgroundColor: color
	};

	//motion options
	const motionBox = {
		in: { opacity: 0 },
		on: { opacity: 1 },
		out: { opacity: 0, transition: { delay: 0 } },
		time: { duration: 0.01, delay: duration / 2 + delay }
	};

	return (
		<div style={{ ...frameStyle, ...style }}>
			{/* children으로 전달된 요소가 block요소이기 때문 내부 wrapper요소도 div처리 */}
			<motion.div
				style={{ width: '100%', height: '100%' }}
				variants={motionBox}
				initial='in'
				animate='on'
				exit='out'
				transition={motionBox.time}>
				{children}
			</motion.div>

			<motion.div
				style={maskStyle}
				initial={{ x: '-101%' }}
				animate={{ x: '101%' }}
				transition={{ duration, delay, ease: 'linear' }}></motion.div>
		</div>
	);
}

/*
	미션 (10시 50분까지 구현)
	- 현재 MaskText, MaskBox, 페이지전체(추후 적용예정)에 공통으로 Mask형태의 모션 요소를 활용하고 있음
	- 해당 마스크 기능만 별도의 컴포넌트로 분리해서 재활용하는 것이 유리
	- 수행 작업 1. Mask컴포넌트를 따로 Mask.jsx형태로 생성
	- 수행 작업 2. Mask컴포넌트를 MaskText.jsx,  MaskBox.jsx에 각각 호출해서 코드 정리
*/
