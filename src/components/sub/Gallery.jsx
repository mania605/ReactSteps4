import { useEffect, useState } from 'react';
import Layout from '../common/Layout';
import Pic from '../common/Pic';
import Modal from '../common/Modal';

export default function Gallery() {
	const [Flickr, setFlickr] = useState([]);
	//모달 컴포넌트 출력여부를 결정할 state생성
	const [ModalOpen, setModalOpen] = useState(false);

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

	return (
		<>
			<Layout title={'GALLERY'}>
				<section className='galleryList'>
					{Flickr.map((data, idx) => {
						return (
							<article key={idx} onClick={() => setModalOpen(true)}>
								<Pic
									src={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_z.jpg`}
									className='pic'
									shadow
								/>
								<h3>{data.title}</h3>
							</article>
						);
					})}
				</section>
			</Layout>

			{/* ModalOpen 상태값이 true일때에만 Modal컴포넌트를 호출해서 출력 */}
			{ModalOpen && <Modal>FLICKR IMAGE</Modal>}
		</>
	);
}

//미션 (2시 30분까기 고민)
//자식 컴포넌트인 Modal안쪽에서 닫기 버튼 클릭시 부모에 있는 ModalOpen이라는 상태값을 false로 변경해서 모달창 닫는 로직 고민
//리액트에서 데이터는 부모에서 자식으로 데이터를 전달할 수 있는 단방향 데이터 방식임을 유의
//부모에서 Modal이란 컴포넌트에 어떤형태의 정보를 전달해야지 자식에서 해당 정보를 바탕으로 자기 자신을 언마운트 처리할지를 고민
