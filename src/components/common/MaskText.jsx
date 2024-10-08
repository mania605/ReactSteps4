import { useEffect, useState } from 'react';

export default function MaskText({ children }) {
	const [Mounted, setMounted] = useState(false);

	const frameStyle = {
		fontSize: '1.2rem',
		fontFamily: 'orbitron',
		color: '#555',
		display: 'inline-block',
		position: 'relative',
		overflow: 'hidden',
		marginBottom: 80
	};
	const conStyle = {
		opacity: 0,
		transitionDuration: '0.1s',
		transitionDelay: '0.3s'
	};
	const maskStyle = {
		width: '100%',
		heigiht: '100%',
		position: 'absolute',
		top: 0,
		left: '-100%',
		backgroundColor: '#555',
		transitionTimingFunction: 'linear',
		transitionDuration: '0.6s'
	};

	//con, mask의 활성화 스타일 객체
	const conStyleActive = { ...conStyle, opacity: 1 };
	const maskStyleActive = { ...maskStyle, left: '100%' };

	useEffect(() => {
		setTimeout(() => {
			setMounted(true);
		}, 1000);
	}, []);

	return (
		<div className='slogan' style={frameStyle}>
			<span style={Mounted ? conStyleActive : conStyle}>{children}</span>
			<div style={Mounted ? maskStyleActive : maskStyle}></div>
		</div>
	);
}
