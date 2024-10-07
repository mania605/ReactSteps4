//src:이미지 url전달받음, className: Pic컴포넌트에 적용한 클래스명을 내부 div 프레임에 적용, shadow: 그림자 출력여부 결정
export default function Pic({ src, className, shadow = false }) {
	const shadowStyle = { width: '100%', height: '100%', objectFict: 'cover', position: 'absolute', top: 20, left: 20, filter: 'blur(20px)', opacity: 0.6 };
	const picStyle = { width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 };

	return (
		<div style={{ position: 'relative' }} className={className}>
			{shadow && <img style={shadowStyle} src={src} alt={src} />}
			<img style={picStyle} src={src} alt={src} />
		</div>
	);
}
