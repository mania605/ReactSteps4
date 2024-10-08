import { motion } from 'framer-motion';

export default function MaskBox({ children, duration, delay, color, style }) {
	//기본 스타일 객체
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

	return (
		<div style={{ ...frameStyle, ...style }}>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0, transition: { delay: 0 } }}
				transition={{ duration: 0.01, delay: duration / 2 + delay }}>
				{children}
			</motion.div>

			<motion.div
				style={maskStyle}
				initial={{ x: '-101%' }}
				animate={{ x: '101%' }}
				transition={{ duration, delay }}></motion.div>
		</div>
	);
}
/*
  미션 (5시 30분 까지)
  - MaskBox.jsx 라는 새로운 컴포넌트 생성
  - 이미지나 그룹덩어리의 박스요소에 마스크모션 처리
*/
