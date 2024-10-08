import { useEffect, useRef } from 'react';

export default function MaskText({ children }) {
	console.log('mask');
	const ref_frame = useRef(null);

	useEffect(() => {
		setTimeout(() => {
			ref_frame.current.classList.add('on');
		}, 100);
	}, []);

	return (
		<div className='slogan' ref={ref_frame}>
			<span>{children}</span>
			<div className='mask'></div>
		</div>
	);
}
