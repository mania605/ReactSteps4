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


	const fetchFlickr = async opt => {	//순서3 - 전달된 type상태값이 opt 파라미터로 전달됨 {type:'mine'} / {type:'inertest'}
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
		const urlSearch = `${baseURL}?method=${method_search}&api_key=${flickr_api}&per_page=${num}&nojsoncallback=1&format=json&tags=${opt.tag}`;


		opt.type === 'mine' && (url = urlMine); //순서4 : 전달되는 type명에 따라서 호출 url이 변경됨
		opt.type === 'interest' && (url = urlInterest);
		opt.type === 'search' && (url = urlSearch);

		const data = await fetch(url);//순서5 : 실제적으로 변경된 url을 통해서 서버 데이터 요청됨
		const json = await data.json();
		setFlickr(json.photos.photo);
	};

	const handleSearch = e => {
		e.preventDefault();
		setType({ type: 'search', tag: '바다' });
	};

	useEffect(() => {
		fetchFlickr(Type);
		ref_gallery.current.classList.remove('on');		//gallery type변경시 일단 갤러리요소에 on을 제거해서 비활성화처리

		setTimeout(() => {
			ref_gallery.current.classList.add('on');		//비활성화 트랜지션 모션시간확보를 위해서 0.8초뒤에 다시 on을 붙여서 활성화 처리
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
{/*순서1 form안쪽의 button을 클릭하고 inpust에서 엔터치면 자동으로 wrapping요소인 form에 자동으로 submit이벤트 발생됨 */}
						<form onSubmit={handleSearch}>
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