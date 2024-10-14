import { useEffect, useRef, useState, useCallback } from 'react';

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

	const initPos = useCallback(() => ref_instMap.current.setCenter(latlng), [latlng]);

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

		window.addEventListener('resize', initPos);
		return () => window.removeEventListener('resize', initPos);
	}, [Index, initPos, createMap]);

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
	리액트에서 함수형 컴포넌트의 개념
	- 리액트는 클로저환경의 함수형 프로그래밍 기반
	- 함수형 프로그래밍 : 함수한에 지역변수를 만들고 함수안쪽에서 또다른 함수를 리턴해서 안쪽의 지역변수를 재사용가능하게 유지하는 프로그래밍적 방법
	- 리액트에서는 함수가 jsx반환 (컴포넌트), 함수가 특정 또다른 기능연산을 위한 함수나, 연산값을 반환 (훅)
	- 위와 같은 원리를 통해서 리액트에서 useRef를 통한 참조객체, state값이 해당 컴포넌트 함수를 재렌더링(재호출하더라도) 유지됨
	리액트에서의 메모이제이션
	- 컴포넌트안쪽에서 활용하지만 반환되지는 않는 특정 값, 함수를 강제로 메모리에 등록해서 재호출될때마다 재연산하지 않도록 처리 
	- memo : 컴포넌트 자체를 메모이제이션
	- useMemo : 복잡한 연산과정을 필요로하는 연산된 결과값 (특정 함수의 반환값) 자체를 메모이제이션, 컴포넌트 재랜더링시 같은 값일 경우 기존값 재사용
	- useCallback 
	: 함수자체를 메모이제이션, 컴포넌트에 인수로 함수 전달시 같은 내용이란것을 인지시켜 불필요한 재랜더링 방지, 
	: 코드의 가독성을 위해서 useEffect안쪽의 사용할 내용들을 함수로 묶어서 외부에 관리할때, 해당 함수에 필요한 의존성 배열을 연결할때
*/