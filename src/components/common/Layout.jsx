import { useLocation } from 'react-router-dom';
import useSplitText from '../../hooks/useSplitText';
import { useEffect, useRef } from 'react';

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

			<section>{children}</section>
		</main>
	);
}
