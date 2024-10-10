import { motion } from 'framer-motion';

export default function MaskText({ children, duration = 0.5, delay = 0, color = '#000', style }) {
	//component styles
	const frameStyle = {
		fontSize: '1.2rem',
		fontFamily: 'orbitron',
		color: color,
		display: 'inline-block',
		position: 'relative',
		overflow: 'hidden',
		marginBottom: 10
	};
	const maskStyle = {
		width: '100%',
		height: '100%',
		position: 'absolute',
		top: 0,
		backgroundColor: color
	};

	//motion options
	const spanMotion = {
		in: { opacity: 0 },
		on: { opacity: 1 },
		out: { opacity: 0, transition: { delay: 0 } },
		time: { duration: 0.01, delay: duration / 2 + delay }
	};
	const maskMotion = {
		in: { x: '-101%' },
		on: { x: '101%' },
		time: { duration, delay }
	};

	return (
		<div style={{ ...frameStyle, ...style }}>
			<motion.span variants={spanMotion} initial='in' animate='on' exit='out' transition={spanMotion.time}>
				{children}
			</motion.span>

			<motion.div style={maskStyle} variants={maskMotion} initial='in' animate='on' transition={maskMotion.time}></motion.div>
		</div>
	);
}
