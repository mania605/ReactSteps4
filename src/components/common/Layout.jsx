import { useLocation } from 'react-router-dom';
import useSplitText from '../../hooks/useSplitText';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import MaskText from './MaskText';

export default function Layout({ title, children }) {
	const ref_title = useRef(null);
	const splitText = useSplitText();
	const { pathname } = useLocation();
	const isDetail = pathname.includes('/youtube/');

	useEffect(() => {
		splitText(ref_title, { interval: 0.1 });
	}, []);

	return (
		<main className={isDetail ? 'detail' : title.toLowerCase()}>
			<h1 ref={ref_title}>{title}</h1>

			<MaskText duration={1} delay={0} color={'#000'}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, ad?
			</MaskText>
			<br />

			<MaskText duration={0.6} delay={1} color={'red'}>
				Lorem ipsum dolor
			</MaskText>

			<motion.section
				initial={{ opacity: 0, y: 200 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 200, transition: { delay: 0 } }}
				transition={{ duration: 1, delay: 0.7, ease: 'linear' }}>
				{children}
			</motion.section>
		</main>
	);
}
