import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import MaskText from './MaskText';
import Mask from './Mask';
import SplitText from './SplitText';

export default function Layout({ title, children }) {
	const { pathname } = useLocation();
	const isDetail = pathname.includes('/youtube/');

	return (
		<>
			<main className={isDetail ? 'detail' : title.toLowerCase()}>
				<SplitText delay={0.5}>{title}</SplitText>

				<MaskText delay={1} color={'#444'} style={{ fontSize: 20, fontFamily: 'arial' }}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, ad?
				</MaskText>
				<br />
				<MaskText delay={1.5} color={'#444'} style={{ marginBottom: 120 }}>
					Lorem ipsum dolor
				</MaskText>

				{/* 순서5. 두번째 줄 마스크 모션 끝날떄쯤 전체 컨텐츠 영상 위쪽으로 페이드인 */}
				<motion.section
					initial={{ opacity: 0, y: 200 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 200, transition: { delay: 0 } }}
					transition={{ duration: 1, delay: 1.5, ease: 'linear' }}>
					{children}
				</motion.section>
			</main>

			<Mask duration={0.5} delay={0} style={{ position: 'fixed' }} />
		</>
	);
}
