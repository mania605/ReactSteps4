import { useEffect, useRef, useState } from 'react';
import Layout from '../common/Layout';
import Pic from '../common/Pic';
import Modal from '../common/Modal';
import Content from '../common/Content';
// import {useFlickrQuery} from '../../hooks/useFlickr';

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


	const fetchFlickr = async opt => { 	// {type:'search', tag:'바다'}라는 객체 상태값이 opt로 전달됨
		const baseURL = 'https://www.flickr.com/services/rest/';
		const method_mine = 'flickr.people.getPhotos';
		const method_interest = 'flickr.interestingness.getList';
		const method_search = 'flickr.photos.search';

		const flickr_api = import.meta.env.VITE_FLICKR_API;
		const myID = '197119297@N02';
		const num = 20;
		let url = '';
		const urlMine = `${baseURL}?method=${method_mine}&api_key=${flickr_api}&user_id=${myID}&per_page=${num}&nojsoncallback=1&format=json`;
		const urlInterest = `${baseURL}?method=${method_interest}&api_key=${flickr_api}&per_page=${num}&nojsoncallback=1&format=json`;
		//검색전용 url값 추가
		const urlSearch = `${baseURL}?method=${method_search}&api_key=${flickr_api}&per_page=${num}&nojsoncallback=1&format=json&tags=${opt.tag}`;

		opt.type === 'mine' && (url = urlMine);
		opt.type === 'interest' && (url = urlInterest);
		//순서5: 전달된 opt값의 type이 search이므로 위에서 준비한 검색 전용 호출 url을 아래쪽 fetch함수에 전달에서 검색 데이터 요청
		opt.type === 'search' && (url = urlSearch);

		const data = await fetch(url);
		const json = await data.json();
		setFlickr(json.photos.photo);
	};

	const handleSearch = e => { //기본전송기능을 막으면서 {type:'search', tag:'바다'}라는 객체값으로 Type상태값 변경처리
		e.preventDefault();
		console.dir(e.target[0].value);
		setType({ type: 'search', tag: e.target[0].value });
	};

	useEffect(() => { //Type상태값 변경되면서 Type값은 내부의 fetchFlickr함수의 인수로 전달됨
		fetchFlickr(Type);
		ref_gallery.current.classList.remove('on');

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
						
						<form onSubmit={handleSearch}> {/* form안쪽의 button을 클릭하고 input에서 엔터치면 자동으로 wrapping요소인 form에 submit이벤트 발생됨 handleSearch호출 */}
							<input type='text' placeholder='검색어를 입력하세요.' />
							<button>search</button>
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