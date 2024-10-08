import { motion } from 'framer-motion';

export default function MaskBox({
	children,
	duration = 0.5,
	delay = 0,
	color = '#000',
	style
}) {
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
				style={{ width: '100%', height: '100%' }}
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
