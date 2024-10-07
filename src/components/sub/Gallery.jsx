import { useEffect, useState } from 'react';
import Layout from '../common/Layout';
import Pic from '../common/Pic';
import Modal from '../common/Modal';

export default function Gallery() {
	const [Flickr, setFlickr] = useState([]);
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

	//의존성 배열에 ModalOpen 상태값을 연결해서 모달창이 열리고 닫힐때마다
	//body요소의 스크롤바 기능 여부를 분기처리
	//정리 : 리액트는 HTML,JS작업방식처럼 직접적인 DOM을 제어하는 방식이 아닌 State의 변경에 따라 간접적으로 기능이 구현되는 패턴을 주로 사용
	//위와 같이 state에 따라 UI의 기능 화면이 변경되는 로직의 패턴을 사용하면
	//복잡한 대단위 프로젝트에서 state상태값만 관리하면 되기에 업무 채산성, 효율성이 높아짐
	useEffect(() => {
		document.body.style.overflow = ModalOpen ? 'hidden' : 'auto';
	}, [ModalOpen]);

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

			{ModalOpen && <Modal setModalOpen={setModalOpen}>FLICKR IMAGE</Modal>}
		</>
	);
}
