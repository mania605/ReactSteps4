import { useEffect, useRef, useState } from 'react';

export default function Map() {
	const { kakao } = window;
	const ref_mapFrame = useRef(null);
	const [Index, setIndex] = useState(0);

	//지도 인스턴스가 담길 빈 참조객체 생성
	const ref_instMap = useRef(null);

	//지도 정보 배열 참조객체 등록 및 비구조화할당으로 개별 정보 추출
	const { current: ref_info } = useRef([
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
	const { latlng, markerImg, markerSize, markerPos } = ref_info[Index];

	//마커 인스턴스 생성
	const inst_marker = new kakao.maps.Marker({
		position: latlng,
		image: new kakao.maps.MarkerImage(markerImg, markerSize, markerPos)
	});

	//지도 위치 중앙으로 초기화 함수
	const initPos = () => {
		console.log('initPost called!!');
		ref_instMap.current.setCenter(latlng);
	};

	//Index상태값 변경시마다 새로운 지도 인스턴스 반환으로 화면 갱신
	useEffect(() => {
		ref_mapFrame.current.innerHTML = '';
		ref_instMap.current = new kakao.maps.Map(ref_mapFrame.current, { center: latlng });
		inst_marker.setMap(ref_instMap.current);

		window.addEventListener('resize', initPos);
	}, [Index]);

	return (
		<section className='map'>
			<h2>Location</h2>

			<figure ref={ref_mapFrame} className='mapFrame'></figure>

			<nav className='btnSet'>
				<ul className='branch'>
					{ref_info.map((el, idx) => (
						<li key={idx} className={idx === Index ? 'on' : ''} onClick={() => setIndex(idx)}>
							{el.title}
						</li>
					))}
				</ul>
			</nav>
		</section>
	);
}
