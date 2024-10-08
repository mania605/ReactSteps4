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
	}, [splitText]);
	//useEffect에 의존성 배열에 특정 값을 등록하라고 뜨는 경우
	//해당 컴포넌트자체적으로 제어되지 않는 요소가 useEffect안쪽에서 활용되고 있을때 등록하라는 권고 사항 출력
	//해결 방법: 등록 처리 (잘못등록하면 재귀적호출 되면서 무한호출 문제)
	//무한호출시 해결방법 : useMemo, useCallback등의 메모이제이션 훅을 이용해서 강제로 메모리에 등록후 사용

	return (
		<main className={isDetail ? 'detail' : title.toLowerCase()}>
			<h1 ref={ref_title}>{title}</h1>

			<MaskText duration={1} delay={0} color={'#000'}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, ad?
			</MaskText>
			<br />

			<MaskText duration={0.6} delay={1} color={'#555'}>
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
