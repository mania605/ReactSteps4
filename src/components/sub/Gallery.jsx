import { useEffect, useState } from 'react';
import Layout from '../common/Layout';
import Pic from '../common/Pic';
import Modal from '../common/Modal';
import Content from '../common/Content';

export default function Gallery() {
	const [Flickr, setFlickr] = useState([]);
	const [ModalOpen, setModalOpen] = useState(false);
	const [Index, setIndex] = useState(0);

	const customMotion = {
		init: { opacity: 0, x: 200 },
		active: { opacity: 1, x: 0 },
		end: { opacity: 0, x: -200 }
	};

	const fetchFlickr = async opt => {
		const baseURL = 'https://www.flickr.com/services/rest/';
		const method_mine = 'flickr.people.getPhotos';
		const method_interest = 'flickr.interestingness.getList';
		const flickr_api = import.meta.env.VITE_FLICKR_API;
		const myID = '197119297@N02';
		const num = 20;
		let url = '';
		const urlMine = `${baseURL}?method=${method_mine}&api_key=${flickr_api}&user_id=${myID}&per_page=${num}&nojsoncallback=1&format=json`;
		const urlInterest = `${baseURL}?method=${method_interest}&api_key=${flickr_api}&per_page=${num}&nojsoncallback=1&format=json`;

		opt.type === 'mine' && (url = urlMine);
		opt.type === 'interest' && (url = urlInterest);

		const data = await fetch(url);
		const json = await data.json();
		setFlickr(json.photos.photo);
	};
	useEffect(() => {
		fetchFlickr({ type: 'interest' });
	}, []);

	useEffect(() => {
		document.body.style.overflow = ModalOpen ? 'hidden' : 'auto';
	}, [ModalOpen]);

//미션
//아래 갤러리 타입 버튼 클릭시 실제 갤러리 타입에 따라 호출
//힌트1 fetchFlickr 호출시 인수로 전달되는 객체가 변경되면 됨
//힌트2 리액트에서 컴포넌트가 재렌더링되려면 무조건 state변경되어야 함.


	return (
		<>
			<Layout title={'GALLERY'}>
				<Content delay={1.5} customMotion={customMotion}>
					<ul className="type">
						<li>My Gallery</li>
						<li>Interest Gallery</li>
					</ul>
					<section className='galleryList'>
						{Flickr.map((data, idx) => {
							return (
								<article
									key={idx}
									onClick={() => {
										setModalOpen(true);
										setIndex(idx);
									}}>
									<Pic src={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_z.jpg`} className='pic' shadow />
									{/* <h3>{data.title}</h3> */}
								</article>
							);
						})}
					</section>
				</Content>
			</Layout>

			{ModalOpen && (
				<Modal setModalOpen={setModalOpen}>
					<Pic src={`https://live.staticflickr.com/${Flickr[Index].server}/${Flickr[Index].id}_${Flickr[Index].secret}_b.jpg`} shadow />
				</Modal>
			)}
		</>
	);
}