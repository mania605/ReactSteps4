import { useLocation } from 'react-router-dom';
import useSplitText from '../../hooks/useSplitText';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import MaskText from './MaskText';
import Mask from './Mask';

export default function Layout({ title, children }) {
	const ref_title = useRef(null);
	const splitText = useSplitText();
	const { pathname } = useLocation();
	const isDetail = pathname.includes('/youtube/');

	useEffect(() => {
		splitText(ref_title, { interval: 0.1 });
	}, [splitText]);

	return (
		<>
			<main className={isDetail ? 'detail' : title.toLowerCase()}>
				<h1 ref={ref_title}>{title}</h1>

				<MaskText duration={0.5} delay={0} color={'#444'} style={{ fontSize: 20, fontFamily: 'arial' }}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, ad?
				</MaskText>
				<br />

				<MaskText duration={0.5} delay={0.5} color={'#444'} style={{ marginBottom: 120 }}>
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

			{/* 다른 요소와는 다르게 전체 페이지를 덮을 때에는 Mask요소가 브라우저를 기준으로 위치가 배치되어야 하므로 fixed속성으로 변경 */}
			<Mask style={{ position: 'fixed' }} />
		</>
	);
}
