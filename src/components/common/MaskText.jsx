import { useEffect, useRef } from 'react';

export default function MaskText({ children }) {
	const ref_frame = useRef(null);

	useEffect(() => {
		ref_frame.current.classList.add('on');
	}, []);

	return (
		<div className='slogan' ref={ref_frame}>
			<span>{children}</span>
			<div className='mask'></div>
		</div>
	);
}
