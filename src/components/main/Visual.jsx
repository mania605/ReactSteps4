import { useFlickrQuery } from '../../hooks/useFlickr';
import Pic from '../common/Pic';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
//Autoplay 모듈 가져옴
import { Autoplay } from 'swiper/modules';
import { useState } from 'react';
import 'swiper/css';

//Swiper 컴포넌트 안쪽에서 호출할 자동롤링 시작 버튼 컴포넌트
function BtnStart() {
	//스와이퍼 전용 autoplay관련 메서드를 호출하기 위해서 useSwiper커스텀 훅으로 swiper 인스턴스 생성
	const swiper = useSwiper();

	return (
		<button className='btnStart' onClick={() => swiper.autoplay.start()}>
			롤링시작
		</button>
	);
}

export default function Visual() {
	const [Index, setIndex] = useState(0);
	const { data, isSuccess } = useFlickrQuery({ type: 'mine' });

	return (
		<figure className='visual'>
			<div className='textBox'>
				{/* 이미지 타이틀정보만 별로 뽑아서 Swipe 변경시마다 해당 순번의 타이틀도 같이 모션 처리 */}
				{data?.map((el, idx) => (
					<h2 key={idx} className={Index === idx ? 'on' : ''}>
						{el.title.substr(0, 30)}
					</h2>
				))}
			</div>

			<Swiper
				modules={[Autoplay]}
				slidesPerView={3}
				spaceBetween={100}
				loop={true}
				centeredSlides={true}
				onSlideChange={el => setIndex(el.realIndex)}
				autoplay={{ delay: 2000, disableOnInteraction: true }}
				onSwiper={swiper => setTimeout(() => swiper.autoplay.start(), 1000)}>
				{/* 데이터배열을 통해 동적생성되고 있는 Slide 컴포넌트 */}
				{isSuccess &&
					data.map((pic, idx) => {
						if (idx >= 10) return null;
						return (
							<SwiperSlide key={idx}>
								<div className='inner'>
									<Pic src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_b.jpg`} style={{ width: '100%', height: '100%' }} shadow />
								</div>
							</SwiperSlide>
						);
					})}

				{/* 자동롤링 시작 버튼 컴포넌트 호출 */}
				<BtnStart />
			</Swiper>
		</figure>
	);
}