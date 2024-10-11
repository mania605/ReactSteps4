import { useEffect, useRef, useState } from 'react';

export default function Map() {
	const { kakao } = window;
	const [Index, setIndex] = useState(0);
	const [Traffic, setTraffic] = useState(false);
	//로드뷰 토글을 위한 state생성 초기값은 false로 로드뷰 초기 숨김처리
	const [Roadview, setRoadview] = useState(false);

	const ref_mapFrame = useRef(null);
	const ref_viewFrame = useRef(null);
	const ref_instMap = useRef(null);
	//로드뷰 인스턴스가 담길 참조객체 생성
	const ref_instView = useRef(null);
	const ref_instClient = useRef(new kakao.maps.RoadviewClient());
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
		// setTraffic(false);
		// setRoadview(false);
		//지점버튼 클릭해서 Index를 기반으로한 위치 인스턴스가 변경될때마다 Traffic, Roadvie상태 초기화해서 일반 지도화면 보이도록 처리
		[setTraffic, setRoadview].forEach(func => func(false));
		ref_mapFrame.current.innerHTML = '';
		ref_instMap.current = new kakao.maps.Map(ref_mapFrame.current, { center: latlng });
		inst_marker.setMap(ref_instMap.current);
		[instType, instZoom].forEach(inst => ref_instMap.current.addControl(inst));

		//roadview 인스턴스 생성
		ref_instView.current = new kakao.maps.Roadview(ref_viewFrame.current);
		//clientInstance의 getNearestPanoId함수 호출해서 현재 위치 인스턴스값 기준으로
		//제일 가까운 panoId값을 찾아서 view인스턴스에 바인딩해서 로드뷰 화면에 출력
		ref_instClient.current.getNearestPanoId(latlng, 50, panoId => ref_instView.current.setPanoId(panoId, latlng));
		window.addEventListener('resize', initPos);
		return () => window.removeEventListener('resize', initPos);
	}, [Index]);

	useEffect(() => {
		Traffic
			? ref_instMap.current.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: ref_instMap.current.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

	return (
		<section className='map'>
			<h2>Location</h2>

			<figure className='mapFrame'>
				{/* Roadview 상태값에 따라 지도화면 로드뷰화면 보임, 암보임 처리 */}
				<article ref={ref_mapFrame} className={`mapFrame ${!Roadview && 'on'}`}></article>
				<article ref={ref_viewFrame} className={`viewFrame ${Roadview && 'on'}`}></article>
			</figure>

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
					{/* Roadview 상태값에 따라 버튼 활성화, 비활성화 처리 */}
					<li onClick={() => setRoadview(!Roadview)} className={Roadview ? 'on' : ''}>
						{`Roadview ${Roadview ? 'OFF' : 'ON'}`}
					</li>
				</ul>
			</nav>
		</section>
	);
}
