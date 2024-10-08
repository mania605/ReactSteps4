import { motion } from 'framer-motion';

export default function MaskText({ children, duration, delay, color }) {
	//기본 스타일 객체
	const frameStyle = {
		fontSize: '1.2rem',
		fontFamily: 'orbitron',
		color: color,
		display: 'inline-block',
		position: 'relative',
		overflow: 'hidden',
		marginBottom: 20
	};
	const maskStyle = {
		width: '100%',
		height: '100%',
		position: 'absolute',
		top: 0,
		backgroundColor: color
	};

	return (
		<div style={frameStyle}>
			<motion.span
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0, transition: { delay: 0 } }}
				transition={{ duration: 0.01, delay: duration / 2 + delay }}>
				{children}
			</motion.span>

			<motion.div
				style={maskStyle}
				initial={{ x: '-100%' }}
				animate={{ x: '100%' }}
				transition={{ duration, delay }}></motion.div>
		</div>
	);
}
/*
  미션 (4시 30분까지)
  - 글자크기, 글꼴, 마진 값등 자잘한 스타일을 호출시에 적용가능
*/
