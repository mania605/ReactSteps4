import { motion } from 'framer-motion';

export default function Content({ children, duration = 1, delay = 0 }) {
	//motion data
	const { init, active, end, time } = {
		init: { opacity: 0, y: 200 },
		active: { opacity: 1, y: 0 },
		end: { opacity: 0, y: 200, transition: { delay: 0 } },
		time: { duration: duration, delay: delay }
	};

	return (
		<motion.div className='content' initial={init} animate={active} exit={end} transition={time}>
			{children}
		</motion.div>
	);
}
