import { useEffect } from 'react';
import { useGlobalState } from '../../hooks/useGlobal';
import { motion } from 'framer-motion';
import useThrottle from '../../hooks/useThrottle';

export default function MobileMenu() {
	const { dispatch } = useGlobalState();
	const closeMenu = () => {
		console.log('closeMenu');
		if (window.innerWidth >= 1000) dispatch({ type: 'CLOSE' });
	};
	const throttledCloseMenu = useThrottle(closeMenu);
	useEffect(() => {
		window.addEventListener('resize', throttledCloseMenu);
		return () => window.removeEventListener('resize', throttledCloseMenu);
	}, [throttledCloseMenu]);
	return (
		<motion.aside className='mobileMenu' onClick={() => dispatch({ type: 'CLOSE' })}>
			MobileMenu
		</motion.aside>
	);
}