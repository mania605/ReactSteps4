import { useFlickrQuery } from '../../hooks/useFlickr';
import Pic from '../common/Pic';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { h2 } from 'framer-motion/client';

export default function Visual() {
	const { data } = useFlickrQuery({ type: 'mine' });
	return (
		<figure className='visual'>
<div className="textBox">
	{data?.map((el,idx)=>(
			<h2 key={idx}>{el.title.substr(0,30)}</h2>
	))}
</div>

			<Swiper slidesPerView={3} spaceBetween={100} loop={true} centeredSlides={true}>
				{data?.map((pic, idx) => {
					if (idx >= 10) return null;
					return (
						<SwiperSlide key={idx}>
							{/* swiperSlide요소에는 바로 css모션 스타일 적용 비권장 */}
							<div className='inner'>
								<Pic src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_b.jpg`} style={{ width: '100%', height: '100%' }} shadow />
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</figure>
	);
}