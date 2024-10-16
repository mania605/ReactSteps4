import { motion } from 'framer-motion';
export default function MobileMenu() {
	const { initial, animate, exit, transition } = {
		initial: { x: -300, opacity: 0 },
		animate: { x: 0, opacity: 1 },
		exit: { x: -300, opacity: 0, transition: { duration: 0.5 } },
		transition: { duraition: 0.5 }
	};
	return (
		<motion.aside className='mobileMenu' initial={initial} animate={animate} exit={exit} transition={transition}>
			MobileMenu
		</motion.aside>
	);
}