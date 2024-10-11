import { useEffect, useRef } from 'react';

export default function Map() {
	const { kakao } = window;
	const ref_mapFrame = useRef(null);

	const mapOption = {
		center: new kakao.maps.LatLng(33.450701, 126.570667)
	};

	useEffect(() => {
		new kakao.maps.Map(ref_mapFrame.current, mapOption);
	}, []);

	return (
		<section className='map'>
			<h2>Location</h2>

			<figure ref={ref_mapFrame} className='mapFrame'></figure>
		</section>
	);
}
