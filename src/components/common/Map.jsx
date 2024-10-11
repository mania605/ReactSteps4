import { useEffect, useRef } from 'react';

export default function Map() {
	const { kakao } = window;
	const ref_mapFrame = useRef(null);

	// 각 지도를 출력하기 위한 정보값의 구조가 복잡하고 자주 변경되지 않는 데이터일때에는 일반 지역변수보다 useRef를 통한 참조객체 등록
	// 참조객체는 state변경에 의해서 컴포넌트 재랜더링 되더라도 메모리가 해제되지 않고 해당 값이 계속 유지됨 (closure 개념 언급)
	const ref_info = useRef([
		{
			title: 'COEX', //데이터 구분을 위한 타이틀
			latlng: new kakao.maps.LatLng(37.5094091584729, 127.0624304750884), //위도,경도를 활용한 위치 인스턴스
			markerImg: 'marker1.png', //마커이미지 경로
			markerSize: new kakao.maps.Size(64, 69), //마커사이즈 인스턴스
			markerOffet: { offset: new kakao.maps.Point(0, 0) } //마커 위치값 인스턴스
		}
	]);
	const inst_marker = new kakao.maps.Marker({ position: ref_info.current[0].latlng });

	useEffect(() => {
		const inst_map = new kakao.maps.Map(ref_mapFrame.current, { center: ref_info.current[0].latlng });
		inst_marker.setMap(inst_map);
	}, []);

	return (
		<section className='map'>
			<h2>Location</h2>

			<figure ref={ref_mapFrame} className='mapFrame'></figure>
		</section>
	);
}
