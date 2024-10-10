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
		// 순서2. 마스크 모션이 끝날때 바로 제목 타이핑 모션
		splitText(ref_title, { interval: 0.1, delay: 0.5 });
	}, [splitText]);

	return (
		<>
			<main className={isDetail ? 'detail' : title.toLowerCase()}>
				<h1 ref={ref_title}>{title}</h1>

				{/* 순서3. 텍스트 타이핑 모션 끝날 시점에 첫줄 텍스트 마스크 모션 시작 */}
				<MaskText delay={1} color={'#444'} style={{ fontSize: 20, fontFamily: 'arial' }}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, ad?
				</MaskText>
				<br />

				{/* 순서4. 첫줄 텍스트 마스크 모션 끝날때 둘째줄 텍스트 마스크 모션 시작 */}
				<MaskText delay={1.5} color={'#444'} style={{ marginBottom: 120 }}>
					Lorem ipsum dolor
				</MaskText>

				{/* 순서5. 두번째 줄 마스크 모션 끝날떄쯤 전체 컨텐츠 영상 위쪽으로 페이드인 시작 */}
				<motion.section
					initial={{ opacity: 0, y: 200 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 200, transition: { delay: 0 } }}
					transition={{ duration: 1, delay: 1.5, ease: 'linear' }}>
					{children}
				</motion.section>
			</main>

			{/* 순번1- 페이지 전환시 바로 전체화면을 가리는 마스크모션 실행 */}
			<Mask duration={0.5} delay={0} style={{ position: 'fixed' }} />
		</>
	);
}
