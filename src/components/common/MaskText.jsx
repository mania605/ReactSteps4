import { motion } from 'framer-motion';
import Mask from './Mask';

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

	//motion options
	const { init, active, end, time } = {
		init: { opacity: 0 },
		active: { opacity: 1 },
		end: { opacity: 0, transition: { delay: 0 } },
		time: { duration: 0.01, delay: duration / 2 + delay }
	};

	return (
		<div style={{ ...frameStyle, ...style }}>
			<motion.span initial={init} animate={active} exit={end} transition={time}>
				{children}
			</motion.span>
			<Mask duration={duration} delay={delay} color={color} />
		</div>
	);
}
