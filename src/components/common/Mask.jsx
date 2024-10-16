import { motion } from 'framer-motion';

export default function Mask({ duration = 0.5, delay = 0, color = '#000', style }) {
	const maskStyle = {
		width: '100%',
		height: '100%',
		position: 'absolute',
		top: 0,
		backgroundColor: color,
		zIndex: 6
	};

	const maskMotion = {
		in: { x: '-101%' },
		on: { x: '101%' },
		time: { duration, delay, ease: 'linear' }
	};
	return (
		<motion.div
			// 마스크 호출시 스타일 수정 가능하도록 처리
			style={{ ...maskStyle, ...style }}
			variants={maskMotion}
			initial='in'
			animate='on'
			transition={maskMotion.time}></motion.div>
	);
}