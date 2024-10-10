import { motion } from 'framer-motion';

export default function Mask({ duration = 0.5, delay = 0, color = '#000' }) {
	const maskStyle = {
		width: '100%',
		height: '100%',
		position: 'absolute',
		top: 0,
		backgroundColor: color
	};

	const maskMotion = {
		in: { x: '-101%' },
		on: { x: '101%' },
		time: { duration, delay, ease: 'linear' }
	};
	return <motion.div style={maskStyle} variants={maskMotion} initial='in' animate='on' transition={maskMotion.time}></motion.div>;
}
