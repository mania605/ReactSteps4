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

	const fetchFlickr= async () =>{
		const baseURL = 'https://www.flickr.com/services/rest/'
		const method_mine= 'flickr.people.getPhotos';
		const method_interest = 'flickr.interstingness.getList';

		const flickr_api = import.meta.env.VITE_FLICKR_API;
		const myID = import.meta.env.VITE_FLICKR_ID;
		const num = 10;
		const urlMine= `${baseURL}?method=${method_mine}&api_key=${flickr_api}&user_id=${myID}&per_page=${num}&nojsoncallback=1&format=json`;
		const urlInterest = `${baseURL}?method=${method_interest}&api_key=${flickr_api}&per_page=${num}&nojsoncallback=1&format=json`;

		opt.type === 'mine' &&(url = urlMine);
		opt.type === 'interest' && (url = urlInterest);


		const data = await fetch(url) ;
		const json = await data.json();
		setFlickr(json.photos.photo);
	};

	useEffect(() => {
fetchFlickr();
	}, []);

	useEffect(() => {
		document.body.style.overflow = ModalOpen ? 'hidden' : 'auto';
	}, [ModalOpen]);

	return (
		<>
			<Layout title={'GALLERY'}> 
				<Content delay={1.5} customMotion={customMotion}>
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
									<h3>{data.title}</h3>
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
