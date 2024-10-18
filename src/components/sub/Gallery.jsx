import { useEffect, useRef, useState } from 'react';
import Layout from '../common/Layout';
import Pic from '../common/Pic';
import Modal from '../common/Modal';
import Content from '../common/Content';
import { useFlickrQuery } from '../../hooks/useFlickr';
import { AnimatePresence } from 'framer-motion';
import { useZustandStore } from '../../hooks/useZustand';

export default function Gallery() {
	console.log('gallery');

	//커스텀훅에 콜백함수를 인수로 넣어서 자동전달되는 전역Sate에서 직접 IsModal상태값을 추출해서 변수에 담아줌
	//위와 같은 로직을 통해서 해당 갤러리 컴포넌트 IsModal값을 제외한 나머지 전역 상태값 변경에는 반응하지 않는 선택적 상태구독 처리
	//이슈사항: 아래와 같이 선택적 상태구독을 했음에도 불구하고 Gallery컴포넌트는 다른 전역 상태값 변경시 계속 재렌더링됨
	//이유: 해당 컴포넌트 자체적으로 선택적 상태구독을 했다고 하더라도 gallery를 감싸는 부모컴포넌트가 재렌더링시 자식 컴포넌트 같이 재렌더링 됨
	const IsModal = useZustandStore(state => state.IsModal);
	const setModalOpen = useZustandStore(state => state.setModalOpen);

	const ref_gallery = useRef(null);
	const [Index, setIndex] = useState(0);
	const [Type, setType] = useState({ type: 'mine' });
	const { data: Flickr } = useFlickrQuery(Type);

	const customMotion = {
		init: { opacity: 0, x: 200 },
		active: { opacity: 1, x: 0 },
		end: { opacity: 0, x: -200 }
	};

	const handleSearch = e => {
		e.preventDefault();
		if (!e.target[0].value.trim()) return alert('검색어를 입력해주세요.');
		setType({ type: 'search', tag: e.target[0].value });
		e.target[0].value = '';
	};

	useEffect(() => {
		ref_gallery.current.classList.remove('on');

		setTimeout(() => {
			ref_gallery.current.classList.add('on');
		}, 800);
	}, [Type]);

	useEffect(() => {
		document.body.style.overflow = IsModal ? 'hidden' : 'auto';
	}, [IsModal]);

	return (
		<>
			<Layout title={'GALLERY'}>
				<Content delay={1.5} customMotion={customMotion}>
					<article className='controller'>
						<ul className='type'>
							<li onClick={() => setType({ type: 'mine' })} className={Type.type === 'mine' ? 'on' : ''}>
								My Gallery
							</li>
							<li onClick={() => setType({ type: 'interest' })} className={Type.type === 'interest' ? 'on' : ''}>
								Interest Gallery
							</li>
						</ul>

						<form onSubmit={handleSearch}>
							<input type='text' placeholder='검색어를 입력하세요.' />
							<button>search</button>
						</form>
					</article>

					<section className='galleryList' ref={ref_gallery}>
						{Flickr?.length === 0 && <p>해당 검색어의 검색 결과가 없습니다.</p>}
						{Flickr?.map((data, idx) => {
							return (
								<article
									key={idx}
									onClick={() => {
										setModalOpen();
										setIndex(idx);
									}}>
									<Pic src={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_z.jpg`} className='pic' shadow />
								</article>
							);
						})}
					</section>
				</Content>
			</Layout>

			<AnimatePresence>
				{IsModal && (
					<Modal>
						<Pic src={`https://live.staticflickr.com/${Flickr[Index].server}/${Flickr[Index].id}_${Flickr[Index].secret}_b.jpg`} shadow />
					</Modal>
				)}
			</AnimatePresence>
		</>
	);
}