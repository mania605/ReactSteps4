import { useFlickrQuery } from '../../hooks/useFlickr';
import Pic from '../common/Pic';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Visual() {
	const { data } = useFlickrQuery({ type: 'mine' });
	return (
		<figure className='visual'>
			<Swiper>
				{data?.map((pic, idx) => {
					if (idx >= 3) return null;
					return (
						<SwiperSlide key={idx}>
							<Pic src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_z.jpg`} style={{ width: '100%', height: '100vh' }} />
						</SwiperSlide>
					);
				})}
			</Swiper>
		</figure>
	);
}