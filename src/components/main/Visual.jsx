
import { useFlickrQuery } from '../../hooks/useFlickr';
import Pic from '../common/Pic';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { EffectCoverflow } from 'swiper/modules';

export default function Visual() {
	const { data } = useFlickrQuery({ type: 'mine' });
	return (
		<figure className='visual'>
			<Swiper          effect={'coverflow'}  spaceBetween={100}       slidesPerView={3} loop = {true}
			
			coverflowEffect={{
				rotate: 50,
				stretch: 0,
				depth: 100,
				modifier: 1,
				slideShadows: true,
			}}
			modules={[EffectCoverflow]}
			> {/*  spaceBetween은 사이 간격   slidesPerView는 한화면에 몇개씩 나오게 할 지 */}

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