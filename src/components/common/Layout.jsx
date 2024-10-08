import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Layout({ title, children }) {
	const { pathname } = useLocation();
	const isDetail = pathname.includes('/youtube/');

	return (
		<main className={isDetail ? 'detail' : title.toLowerCase()}>
			<motion.h1
				initial={{ x: -200, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				exit={{ scale: 2, opacity: 0, transition: { duration: 0.3 } }}
				transition={{ duration: 1, ease: 'easeIn' }}>
				{title}
			</motion.h1>

			<section>{children}</section>
		</main>
	);
}
