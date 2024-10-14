import { useEffect, useRef, useState } from 'react';

export default function Map() {
	const { kakao } = window;

	//화면 렌더링에 필요한 state값 초기화
	const [Index, setIndex] = useState(0);
	const [Traffic, setTraffic] = useState(false);
	const [Roadview, setRoadview] = useState(false);

	//지점정보가 담긴 참조객체를 생성하고 현재 활성화된 Index순번의 데이터 추출
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

	//순수함수 형태로 값을 바로 전달받을 수 있는 인스턴스값 참조객체에 담음
	const ref_instClient = useRef(new kakao.maps.RoadviewClient());
	const ref_instType = useRef(new kakao.maps.MapTypeControl());
	const ref_instZoom = useRef(new kakao.maps.ZoomControl());

	//컴포넌트 마운트시에만 전달받을 수 있는 빈 참조객체 생성(인덱스 상태값이 변경될 때마다 값이 담겨야 하기 때문에 비워놓기)
	const ref_mapFrame = useRef(null);
	const ref_viewFrame = useRef(null);
	const ref_instMap = useRef(null);
	const ref_instMarker = useRef(null);
	const ref_instView = useRef(null);

	//리사이즈 이벤트에 연결될 화면위치 초기화 함수
	const initPos = () => ref_instMap.current.setCenter(latlng);

	//Index값이 변경될때마다 지도초기화, 뷰,마커, 로드뷰인스턴스 생성 및 리사이즈 이벤트연결
	useEffect(() => {
		ref_mapFrame.current.innerHTML = '';

		//맵, 마커, 로드뷰, 로드뷰 인스턴스 생성후 미리 생성한 참조객체에 옮겨담음
		ref_instMap.current = new kakao.maps.Map(ref_mapFrame.current, { center: latlng });
		ref_instMarker.current = new kakao.maps.Marker({
			position: latlng,
			image: new kakao.maps.MarkerImage(markerImg, markerSize, markerPos)
		});
		ref_instView.current = new kakao.maps.Roadview(ref_viewFrame.current);

		//마커 인스턴스에 지도 인스턴스 바인딩해서 지도에 마커 출력
		ref_instMarker.current.setMap(ref_instMap.current);
		//교통정보, 로드뷰 토글 상태 변경함수 반복호출해서 초기화 및 컨트롤러 반복호출하여 초기화
		[setTraffic, setRoadview].forEach(func => func(false));
		[ref_instType.current, ref_instZoom.current].forEach(inst => ref_instMap.current.addControl(inst));
		//로드뷰 인스턴스에 panoId연결해 실제 로드뷰화면 출력하는 호출문
		ref_instClient.current.getNearestPanoId(latlng, 50, panoId => ref_instView.current.setPanoId(panoId, latlng));

		//윈도우 전역 객체에 resize 이벤트 핸들러 연결 및 제거
		window.addEventListener('resize', initPos);
		return () => window.removeEventListener('resize', initPos);
	}, [Index]);

	//Traffic 값이 반전될때마다 트레픽 레이어 토글
	useEffect(() => {
		Traffic
			? ref_instMap.current.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: ref_instMap.current.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

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
//미션 - 5시 40분까지 위의 분류된 카테고리 항목별로 코드 기능 분석 및 정리
