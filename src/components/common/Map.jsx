import { useEffect, useRef, useState,useCallback } from 'react';

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

const initPos= useCallback(()=>ref_instMap.current.setCenter(latlng),[latlng]);
 
	const createMap = useCallback (() =>
		{
			ref_mapFrame.current.innerHTML = '';
			ref_instMap.current = new kakao.maps.Map(ref_mapFrame.current, { center: latlng });
			ref_instMarker.current = new kakao.maps.Marker({ position: latlng, image: new kakao.maps.MarkerImage(markerImg, markerSize, markerPos) });
			ref_instView.current = new kakao.maps.Roadview(ref_viewFrame.current);
			ref_instMarker.current.setMap(ref_instMap.current);
	
			[setTraffic, setRoadview].forEach(func => func(false));
			[ref_instType.current, ref_instZoom.current].forEach(inst => ref_instMap.current.addControl(inst));
			ref_instClient.current.getNearestPanoId(latlng, 50, panoId => ref_instView.current.setPanoId(panoId, latlng));
		},[kakao,latlng, markerImg, markerSize,markerPos]); 

	//미션
// initPos, createMap을 useEffect외부로 분리하면 의존성배열에 initPos, createMap을 등록하라고 권고문구가 뜨는지 이유 고민
//이유: 해당 외부함수는 상태값을 활용해서 동작되는 함수, useEffect안에서 물리적으로 사용되는 함수인데
//해당함수가 외부에서 변경될 수도 있다고 인지하기 때문에  해당 함수 자체도 의존성 배열에 등록하라고 요청되는 것임.

//의존성 배열에 eslint가 권고하는대로 initPos,  createMap을 의존성 배열에 등록
//initPos,createMap을 useEffect의 의존성 배열에 등록시 다시 해당 함수자체에 useCallback처리하라는 권고문구 뜨는 이유
//: 여러 상태값이 useEffect안에 의존성 배열 형태로 같이 등록되어 있기 때문에 함수 자체를 메모이제이션 해서 필요할 때만함수를 다시 읽도록 하기 위함.(기존함수 내용을 재사용하기 위함)

//해당 함수를 useCallback으로 메모이제이션 처리하면 다시 의존성 배열에 권고사항이 뜨는 이유
//: 해당 메모이제이션처리하긴 했는데 메모이제이션 한 함수 내부에 상태값을 의존하는 구문이 포함되어 있으면 해당 상태값 변경시
//함수를 재연산 해야 되기 때문



//GPT답 만약 createMap이나 initPos를 의존성 배열에 추가하면, 이 두 함수가 컴포넌트가 렌더링될 때마다 새로 생성되므로, useEffect가 의존성 배열에 등록된 새로 생성된 함수들을 감지하고 계속해서 재실행됩니다. 이로 인해 불필요한 렌더링과 재실행이 일어나 성능에 문제가 생길 수 있습니다.

// 문제점 확인 후 메모이제이션 관련 문법으로 해결
//initPos와 createMap 함수 메모이제이션:이 두 함수를 useCallback으로 감싸 메모이제이션하여 매번 재생성되지 않도록 합니다.

	useEffect(() => {
		//컴포넌트 마운트시 지도생성함수 호출
		createMap();

		window.addEventListener('resize', initPos);
		return () => window.removeEventListener('resize', initPos);
	}, [Index, initPos, createMap]);

	useEffect(() => {
		Traffic ? ref_instMap.current.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC) : ref_instMap.current.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
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
/* 
리액트에서 함수형 컴포넌트의 개념
-리액트는 클로저환경의 함수형 프로그래밍 기반
-함수형 프로그래밍: 함수안에 지역변수를 만들고 함수 안쪽에서 또다른 함수를 리턴해서 안쪽의 지역변수를 캡슐화(재사용가능하게유지하는 프로그래밍적 방법)
위와 같은 원리를 통해서 리액트에서 useRef를 통한 참조객체, state값이 해당컴포넌트 함수를 재렌더링(재호출)하더라도 유지됨

React에서의 Memoization
-컴포넌트안쪽에서 활용하지만, 반환되지는 않는 특정 값, 함수를 강제로 메모리에 등록해서 재호출 될때마다 재연산하지 않도록 처리
-memo: 컴포넌트 자체를 메모이제이션
-useMemo : 복잡한 연산과정을 필요로하는 연산된 결과값(특정 함수의 반환값) 자체를 메모이제이션, 컴포넌트 재렌더링시 같은 값일 경우 기존값 재사용
-useCallback: 
:함수자체를 메모이제이션, 해당 함수가 특정 컴포넌트에 인수로 전달되면 같은 함수이더라도 매번 자식 컴포넌트는 재호출 됨
컴포넌트 인수로 함수 전달시 같은 값이라는 것을 인지시켜 불필요한 재렌더링 방지, 
사용예: 코드의 가독성을 위해서 useEffect안쪽의 사용할 내용들을 함수로 묶어서 외부에 관리할 때, 
해당 함수에 필요한 의존성 배열을 연결할 때,
*/ 
