import { useEffect, useRef, useState } from 'react';

export default function Map() {
	const { kakao } = window;
	let ref_mapFrame = useRef(null);
	const [Index, setIndex] = useState(0);

	// 각 지점 정보를 참조객체로 관리
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

	//기존 참조객체명까지 매번 호출하기 번거로우므로 비구조화당을 통해 현재 Index순선 상태변화에 따라 활성화되고 있는 객체의 key값을 바로 추출
	const { latlng, markerImg, markerSize, markerPos } = ref_info.current[Index];

	//위의 비구조화할당으로 추출한 정보값으로 마커 인스턴스 생성
	const inst_marker = new kakao.maps.Marker({
		position: latlng,
		image: new kakao.maps.MarkerImage(markerImg, markerSize, markerPos)
	});

	//컴포넌트 마운트시 한번만 지도인스턴스 생성 및 마커 인스턴스 바인딩
	//	Index 상태값이 변경될때마다 변경된 순번 상태값으로 지도 인스턴스 다시 생성해서 화면 갱신
	useEffect(() => {
		const inst_map = new kakao.maps.Map(ref_mapFrame.current, { center: latlng });
		inst_marker.setMap(inst_map);
	}, [Index]);

	return (
		<section className='map'>
			<h2>Location</h2>

			<figure ref={ref_mapFrame} className='mapFrame'></figure>

			<nav className='btnset'>
				<ul className='branch'>
					{ref_info.current.map((el, idx) => (
						//동적으로 li생성: 클릭한 li의 순서값 idx로 Index상태값 변경
						//-> 컴포넌트 재랜더링 되면서 변경된 숩너의 정보값으로 지도화면 갱신됨
						<li key={idx} onClick={() => setIndex(idx)}>
							{el.title}
						</li>
					))}
				</ul>
			</nav>
		</section>
	);
}

/*
  미션 (11시 23분)
  - 지도 출력 박스 밑에 참조객체 담겨있는 지점정보 배열을 활요하여 동적으로 지점 버튼 3개 출력
  - 이때 title정보값으로 버튼 이름 활용
  - 버튼 클릭시 Index 상태값을 변경해 바뀐 순번의 지점 정보로 화면이 갱신되도록 이벤트 처리
*/
