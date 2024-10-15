
import { useFlickrQuery } from '../../hooks/useFlickr';
import Pic from '../common/Pic';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Visual() {
	const { data } = useFlickrQuery({ type: 'mine' });
	return (
		<figure className='visual'>
			<Swiper      spaceBetween={100}       slidesPerView={4} loop = {true}> {/*  spaceBetween은 사이 간격   slidesPerView는 한화면에 몇개씩 나오게 할 지 */}

				{data?.map((pic, idx) => {
					if (idx >= 10) return null;
					return (
						<SwiperSlide key={idx}>
							<Pic src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_b.jpg`} style={{ width: '100%', height: '100%' }} shadow/>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</figure>
	);
}