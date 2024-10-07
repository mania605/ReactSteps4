import { useEffect, useState } from 'react';
import Layout from '../common/Layout';

export default function Gallery() {
	const [Flickr, setFlickr] = useState([]);
	console.log(Flickr);

	useEffect(() => {
		const method = 'flickr.people.getPhotos';
		const flickr_api = '21e294ad0ec03a32d7355980457d9e11';
		const myID = '197119297@N02';
		const num = 10;
		const url = `https://www.flickr.com/services/rest/?method=${method}&api_key=${flickr_api}&user_id=${myID}&per_page=${num}&nojsoncallback=1&format=json`;

		fetch(url)
			.then(data => data.json())
			.then(json => {
				setFlickr(json.photos.photo);
			});
	}, []);

	return (
		<Layout title={'GALLERY'}>
			<section className='galleryList'>
				{Flickr.map((data, idx) => {
					return (
						<article key={idx}>
							<h3>{data.title}</h3>
						</article>
					);
				})}
			</section>
		</Layout>
	);
}
/*
	useState, useEffect 훅을 활용해서 외부 서버데이터를 가져오고 컴포넌트에 렌더링하는 패턴
	1.외부데이터를 담을 State와 State변경함수를 useState로 부터 생성
	2.의존성 배열이 비어있는 useEffect구문 생성 (서버데이터는 컴포넌트 초기 렌더링시 한번만 가져오는 것이 일반적)
	3.useEffect구문 안쪽에서 데이터를 요청URL을 생성하기 위한 정보값 변수에 담기
	4.useEffect구문 안쪽에서 완성된 요청 URL로 fetch함수를 통해 데이터 요청
	4-1.만약 제대로 url요청을 했음에도 불구하고 콘솔에러로 'not Valid JSON'에러 뜰시 다음의 쿼리스트링 옵션을 뒤에 추가
	4-2. nojsoncallback=1&format=json;
	5.fetch함수의 then구문 안에서 전달받은 서버데이터로부터 배열만 뽑아서 미리 준비해놓은 State에 State변경함수로 담기
	6.return문 안쪽에서 State값을 map으로 반복돌며 원하는 형태의 JSX로 출력
*/
