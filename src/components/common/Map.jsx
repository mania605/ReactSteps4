import { useEffect, useRef } from 'react';

export default function Map() {
	const { kakao } = window;
	const ref_mapFrame = useRef(null);

	//위치 인스턴스 생성 (지도, 마커 인스턴스 생성시 필요)
	const inst_position = new kakao.maps.LatLng(33.450701, 126.570667);
	//마커 인스턴스 생성
	const inst_marker = new kakao.maps.Marker({ position: inst_position });

	//jsx반환되고 화면에 컴포넌트 마운트시 지도 인스턴스 생성
	useEffect(() => {
		//지도 인스턴스 생성은 ref_mapFrame에 담겨있는 실제 돔요소를 인수로 필요로 하므로 useEffect구문안쪽에서 생성
		//이때 두번째 인수로 위치 인스턴스 전달
		const inst_map = new kakao.maps.Map(ref_mapFrame.current, { center: inst_position });
		//생성된 마커인스턴의 setMap 메서드 호출시 지도 인스턴스 값 인수로 전달
		inst_marker.setMap(inst_map);
	}, []);

	return (
		<section className='map'>
			<h2>Location</h2>

			<figure ref={ref_mapFrame} className='mapFrame'></figure>
		</section>
	);
}
