import { useEffect, useRef, useState } from 'react';
import Layout from '../common/Layout';
import Pic from '../common/Pic';
import Modal from '../common/Modal';
import Content from '../common/Content';

export default function Gallery() {
	const ref_gallery = useRef(null);
	const [Flickr, setFlickr] = useState([]);
	const [ModalOpen, setModalOpen] = useState(false);
	const [Index, setIndex] = useState(0);
	const [Type, setType] = useState({ type: 'mine' });

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
		fetchFlickr(Type);
		//gallery type변경시 일단 갤러리요소에 on을 제거해서 비활성화처리
		ref_gallery.current.classList.remove('on');

		//비활성화 트랜지션 모션시간확보를 위해서 0.8초뒤에 다시 on을 붙여서 활성화 처리
		setTimeout(() => {
			ref_gallery.current.classList.add('on');
		}, 800);
	}, [Type]);

	useEffect(() => {
		document.body.style.overflow = ModalOpen ? 'hidden' : 'auto';
	}, [ModalOpen]);

	return (
		<>
			<Layout title={'GALLERY'}>
				<Content delay={1.5} customMotion={customMotion}>
					<article className='controller'>
						<ul className='type'>
							<li onClick={() => setType({ type: 'mine' })} className={Type.type === 'mine' && 'on'}>
								My Gallery
							</li>
							<li onClick={() => setType({ type: 'interest' })} className={Type.type === 'interest' && 'on'}>
								Interest Gallery
							</li>
						</ul>
						<form>
							<input type='text' placeholder='검색어를 입력하세요.' />
							<button>Serach</button>
						</form>
					</article>
					<section className='galleryList' ref={ref_gallery}>
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