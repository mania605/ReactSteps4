import { useLocation } from 'react-router-dom';

export default function Layout({ title, children }) {
	const { pathname } = useLocation();

	//현재 url상의 path가 /youtube/를 포함하고 있드면 isDetail은 true, 그렇지 않으면 false
	const isDetail = pathname.includes('/youtube/');

	return (
		// 현재 출력되는 컴포넌트가 상세페이지일때만 detail클래스를 적용하고 그렇지 않을때는 title값을 클래스로 적용
		<main className={isDetail ? 'detail' : title.toLowerCase()}>
			<h1>{title}</h1>

			<section>{children}</section>
		</main>
	);
}
