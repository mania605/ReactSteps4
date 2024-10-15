import { useEffect, useRef, useState } from 'react';
import Layout from '../common/Layout';
import Pic from '../common/Pic';
import Modal from '../common/Modal';
import Content from '../common/Content';
import { useFlickrQuery } from '../../hooks/useFlickr';

export default function Gallery() { 
	const ref_gallery = useRef(null); 
	const [ModalOpen, setModalOpen] = useState(false);
	const [Index, setIndex] = useState(0);
		const [Type, setType] = useState({ type: 'mine' }); //{type:'mine'}값으로 Type 상태값 초기화
	const { data: Flickr } = useFlickrQuery(Type);	//처음 마운트기 위쪽의 상태값으로 data fetching및 반환

	const customMotion = {
		init: { opacity: 0, x: 200 },
		active: { opacity: 1, x: 0 },
		end: { opacity: 0, x: -200 }
	};

	//선생님 필기
	const handleSearch = e => {
		e.preventDefault();
		if (!e.target[0].value.trim()) return alert('검색어를 입력하세요!');// 검색어가 없으면 경고창
		setType({ type: 'search', tag: e.target[0].value });
		e.target[0].value = '';  // 검색어 제출 후 input 값을 비웁니다.
	};

// //검색어 비우기 추가한거
// 	const handleSearch = e => { 
// 		e.preventDefault(); 
// 		console.dir(e.target[0].value);
// 		const searchTerm = e.target[0].value;
// 		if (!searchTerm) return; // 검색어가 없으면 함수 종료
//   	setType({ type: 'search', tag: e.target[0].value });
// 		e.target[0].value = '';  // 검색어 제출 후 input 값을 비웁니다.
// 	};

	useEffect(() => { 
		
		ref_gallery.current.classList.remove('on');
		setTimeout(() => {
			ref_gallery.current.classList.add('on');
		}, 800);
	}, [Type]);

	useEffect(() => { // 모달 열림 여부에 따라 스크롤 잠금 처리
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

						<form onSubmit={handleSearch}>
							<input type='text' placeholder='검색어를 입력하세요.' />
							<button>search</button>
						</form>
					</article>

					<section className='galleryList' ref={ref_gallery}>
						{Flickr?.map((data, idx) => {
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