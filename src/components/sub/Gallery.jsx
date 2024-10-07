import { useEffect, useState } from 'react';
import Layout from '../common/Layout';
import Pic from '../common/Pic';
import Modal from '../common/Modal';

export default function Gallery() {
	console.log('Gallery Component Rendered!!');
	const [Flickr, setFlickr] = useState([]);
	const [ModalOpen, setModalOpen] = useState(false);
	const [Index, setIndex] = useState(0);

	useEffect(() => {
		const method = 'flickr.people.getPhotos';
		const flickr_api = import.meta.env.VITE_FLICKR_API;
		const myID = '197119297@N02';
		const num = 10;
		const url = `https://www.flickr.com/services/rest/?method=${method}&api_key=${flickr_api}&user_id=${myID}&per_page=${num}&nojsoncallback=1&format=json`;

		fetch(url)
			.then(data => data.json())
			.then(json => {
				setFlickr(json.photos.photo);
			});
	}, []);

	useEffect(() => {
		document.body.style.overflow = ModalOpen ? 'hidden' : 'auto';
	}, [ModalOpen]);

	return (
		<>
			<Layout title={'GALLERY'}>
				<section className='galleryList'>
					{Flickr.map((data, idx) => {
						return (
							<article
								key={idx}
								onClick={() => {
									//해당 요소 클릭시마다 핸들러함수 안쪽에서 ModalOpen, Index라는 2개의 상태값이 동시에 변경이 되지만
									//실제 컴포넌트는 한번만 재랜더링 됨
									//리액트18이전까지는 AutoBatching 기능이 지원안되서
									//같은 렌더링 사이클에서 복수개의 상태값 변경시 변경되는 상태값의 갯수만큼 재랜더링됨

									//리액트18버전 부터는 AutoBatching 기능 지원됨
									//특정 렌더링 사이클에서 복수개의 상태값이 변경되더라도 해당 상태값들을 Batching(그룹화)처리해 한번만 재렌더링 처리
									setModalOpen(true);
									setIndex(idx);
								}}>
								<Pic src={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_z.jpg`} className='pic' shadow />
								<h3>{data.title}</h3>
							</article>
						);
					})}
				</section>
			</Layout>

			{ModalOpen && (
				<Modal setModalOpen={setModalOpen}>
					<Pic src={`https://live.staticflickr.com/${Flickr[Index].server}/${Flickr[Index].id}_${Flickr[Index].secret}_b.jpg`} shadow />
				</Modal>
			)}
		</>
	);
}

/*
	모달안에 반복 이벤트가 발생한 순번의 요소의 정보를 출력하는 패턴
	
	1. 순서값을 저장할 상태값 생성
	2. 반복 요소에 이벤트 발생시 이벤트가 발생한 요소의 순서값을 상태값에 저장
	3. 모달 안쪽에서 출력해야되는 정보를 순서 상태값에 연동처리
*/
