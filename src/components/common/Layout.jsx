import { useLocation } from 'react-router-dom';
import Mask from './Mask';
import SplitText from './SplitText';
import { useEffect } from 'react';

export default function Layout({ title, children }) {
	const { pathname } = useLocation();
	const isDetail = pathname.includes('/youtube/');
	console.log(pathname);

	let currentClass = '';

	// path명을 통해 레이아웃에 다른 클래스명 적용
if	(isDetail) currentClass = 'detail' ;
else if (pathname=== '/') currentClass='main';
else currentClass =title.toLowerCase();


	//라우터를 통해 새로운 페이지 컴포넌트 마운트시 강제로 윈도우의 스크롤 위치값을 0으로 초기화
	useEffect(() => {
		window.scrollTo({ top: 0 });
	}, []);
	
	return (
		<>
			<main className={currentClass}>
				<SplitText delay={0.5}>{title}</SplitText>
				<section>{children}</section>
			</main>

			<Mask duration={0.5} delay={0} style={{ position: 'fixed' }} />
		</>
	);
}