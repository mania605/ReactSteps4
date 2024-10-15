import { useLocation } from 'react-router-dom';
import Mask from './Mask';
import SplitText from './SplitText';
import { useEffect } from 'react';

export default function Layout({ title, children }) {
	const { pathname } = useLocation();
	const isDetail = pathname.includes('/youtube/');
	let currentClass = '';

	//path명을 통해 레이아웃에 다른 클래스명 적용
	if (isDetail) currentClass = 'detail';
	else if (pathname === '/') currentClass = 'main';
	else currentClass = title.toLowerCase();

	useEffect(() => {
		window.scrollTo({ top: 0 });
	}, []);

	return (
		<>
			<main className={currentClass}>
				{pathname !== '/' && <SplitText delay={0.5}>{title}</SplitText>}
				<section>{children}</section>
			</main>

			<Mask duration={0.5} delay={0} style={{ position: 'fixed' }} />
		</>
	);
}