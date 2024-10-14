import { useEffect, useRef, useState, useCallback } from 'react';
import useThrottle from '../../hooks/useThrottle';

export default function Map() {
	const { kakao } = window;

	const [Index, setIndex] = useState(0);
	const [Traffic, setTraffic] = useState(false);
	const [Roadview, setRoadview] = useState(false);

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
	const ref_instClient = useRef(new kakao.maps.RoadviewClient());
	const ref_instType = useRef(new kakao.maps.MapTypeControl());
	const ref_instZoom = useRef(new kakao.maps.ZoomControl());
	const ref_mapFrame = useRef(null);
	const ref_viewFrame = useRef(null);
	const ref_instMap = useRef(null);
	const ref_instMarker = useRef(null);
	const ref_instView = useRef(null);

	const initPos = useCallback(() => {
		console.log('initPos');
		ref_instMap.current.setCenter(latlng);
	}, [latlng]);

	//useThrottle커스텀훅을 통해서 throttle이 적용된 새로운 throttledInitPos라는 함수 반환받음
	const throttledInitPos = useThrottle(initPos);
	const createMap = useCallback(() => {
		ref_mapFrame.current.innerHTML = '';
		ref_instMap.current = new kakao.maps.Map(ref_mapFrame.current, { center: latlng });
		ref_instMarker.current = new kakao.maps.Marker({ position: latlng, image: new kakao.maps.MarkerImage(markerImg, markerSize, markerPos) });
		ref_instView.current = new kakao.maps.Roadview(ref_viewFrame.current);
		ref_instMarker.current.setMap(ref_instMap.current);

		[setTraffic, setRoadview].forEach(func => func(false));
		[ref_instType.current, ref_instZoom.current].forEach(inst => ref_instMap.current.addControl(inst));
		ref_instClient.current.getNearestPanoId(latlng, 50, panoId => ref_instView.current.setPanoId(panoId, latlng));
	}, [kakao, latlng, markerImg, markerSize, markerPos]);

	useEffect(() => {
		createMap();

		//throttle이 적용된 핸들러함수를 resize이벤트에 연결 및 제거
		window.addEventListener('resize', throttledInitPos);
		return () => window.removeEventListener('resize', throttledInitPos);
	}, [Index, throttledInitPos, createMap]);

	useEffect(() => {
		Traffic ? ref_instMap.current.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC) : ref_instMap.current.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic, kakao]);

	return (
		<section className='map'>
			<h2>Location</h2>

			{/* 맵, 로드뷰 프레임 */}
			<figure className='mapFrame'>
				<article ref={ref_mapFrame} className={`mapFrame ${!Roadview && 'on'}`}></article>
				<article ref={ref_viewFrame} className={`viewFrame ${Roadview && 'on'}`}></article>
			</figure>

			{/* 컨트롤 버튼 모음 */}
			<nav className='btnSet'>
				<ul className='branch'>
					{ref_info.current.map((el, idx) => (
						<li key={idx} className={idx === Index ? 'on' : ''} onClick={() => setIndex(idx)}>
							{el.title}
						</li>
					))}
				</ul>

				<ul className='btnToggleSet'>
					<li onClick={() => setTraffic(!Traffic)} className={Traffic ? 'on' : ''}>
						{`Traffic ${Traffic ? 'OFF' : 'ON'}`}
					</li>
					<li onClick={() => setRoadview(!Roadview)} className={Roadview ? 'on' : ''}>
						{`Roadview ${Roadview ? 'OFF' : 'ON'}`}
					</li>
				</ul>
			</nav>
		</section>
	);
}

/*
	throttle 
	- throttle의 개념 : 물리적으로 일정시간동안의 함수 호출을 줄여서 성능개선
	- throttle 사용하는 주된 경우 : 단기간에 이벤트가 많이 발생하는 resize, scroll, mousemove등에 연결되는 핸들러함수를 throttle처리
	- throttle은 이벤트의 발생자체를 줄이는 것이 아닌, 이벤트에 연결되어 있는 핸들러함수의 호출자체를 줄임
*/