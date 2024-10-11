import { useEffect, useRef, useState } from 'react';

export default function Map() {
	const { kakao } = window;
	const [Index, setIndex] = useState(0);
	//Traffic 레이어 활성/비활성 토글하기 위한 state생성
	const [Traffic, setTraffic] = useState(false);
	const ref_mapFrame = useRef(null);
	const ref_instMap = useRef(null);
	const ref_info = useRef([
		{
			title: 'COEX',
			latlng: new kakao.maps.LatLng(37.5094091584729, 127.0624304750884),
			markerImg: 'marker1.png',
			markerSize: new kakao.maps.Size(232, 99),
			markerOffset: { offset: new kakao.maps.Point(116, 99) }
		},
		{
			title: 'NEXON',
			latlng: new kakao.maps.LatLng(37.40211707077346, 127.10344953763003),
			markerImg: 'marker2.png',
			markerSize: new kakao.maps.Size(232, 99),
			markerPos: { offset: new kakao.maps.Point(116, 99) }
		},
		{
			title: 'CITYHALL',
			latlng: new kakao.maps.LatLng(37.5662952, 126.9779451),
			markerImg: 'marker3.png',
			markerSize: new kakao.maps.Size(232, 99),
			markerPos: { offset: new kakao.maps.Point(116, 99) }
		}
	]);
	const { latlng, markerImg, markerSize, markerPos } = ref_info.current[Index];

	const inst_marker = new kakao.maps.Marker({
		position: latlng,
		image: new kakao.maps.MarkerImage(markerImg, markerSize, markerPos)
	});

	const instType = new kakao.maps.MapTypeControl();
	const instZoom = new kakao.maps.ZoomControl();

	const initPos = () => {
		console.log('initPos called!!');
		ref_instMap.current.setCenter(latlng);
	};

	useEffect(() => {
		//Index 상태값 변경시 (지점 버튼 클릭해서 지도화면 갱신시) 무조건 트래픽 레이어 제거
		setTraffic(false);
		ref_mapFrame.current.innerHTML = '';
		ref_instMap.current = new kakao.maps.Map(ref_mapFrame.current, { center: latlng });
		inst_marker.setMap(ref_instMap.current);
		[instType, instZoom].forEach(inst => ref_instMap.current.addControl(inst));

		window.addEventListener('resize', initPos);
		return () => window.removeEventListener('resize', initPos);
	}, [Index]);

	//Traffic 상태값에 boolean값을 담아주고 해당 상태가 변경될때마다 지도 레이어 ON/OFF메서드 호출
	useEffect(() => {
		Traffic
			? ref_instMap.current.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: ref_instMap.current.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);
	return (
		<section className='map'>
			<h2>Location</h2>

			<figure ref={ref_mapFrame} className='mapFrame'></figure>

			<nav className='btnSet'>
				<ul className='branch'>
					{ref_info.current.map((el, idx) => (
						<li key={idx} className={idx === Index ? 'on' : ''} onClick={() => setIndex(idx)}>
							{el.title}
						</li>
					))}
				</ul>

				<ul className='btnToggleSet'>
					{/* 버튼 클릭시 상태변경함수로 Traffic상태값 반전 및 3항 연산자로 버튼 활성/비활성화 처리 */}
					<li onClick={() => setTraffic(!Traffic)} className={Traffic ? 'on' : ''}>
						{`Traffic ${Traffic ? 'OFF' : 'ON'}`}
					</li>
					<li>Roadview</li>
				</ul>
			</nav>
		</section>
	);
}
