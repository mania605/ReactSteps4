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

			{/* 자식 컴포넌트인 모달 안쪽에서 부모인 ModalOpen상태값을 변경해야 되기 때문에 상태변경함수 자체를 전달 */}
			{ModalOpen && <Modal setModalOpen={setModalOpen}>FLICKR IMAGE</Modal>}
		</>
	);
}
