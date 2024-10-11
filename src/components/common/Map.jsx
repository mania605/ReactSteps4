import { useEffect, useRef } from 'react';

export default function Map() {
	const { kakao } = window;
	const ref_mapFrame = useRef(null);

	const inst_postion = new kakao.maps.LatLng(33.450701, 126.570667);

	const inst_marker = new kakao.maps.Marker({
		position: inst_postion
	});

	useEffect(() => {
		const inst_map = new kakao.maps.Map(ref_mapFrame.current, mapOption);
		inst_marker.setMap(inst_map);
	}, []);

	return (
		<section className='map'>
			<h2>Location</h2>

			<figure ref={ref_mapFrame} className='mapFrame'></figure>
		</section>
	);
}
