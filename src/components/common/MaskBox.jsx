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
