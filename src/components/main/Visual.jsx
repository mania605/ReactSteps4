import { useFlickrQuery } from '../../hooks/useFlickr';
import Pic from '../common/Pic';
import { Swiper, SwiperSlide } from 'swiper/react';
//Autoplay 모듈 가져옴
import { Autoplay } from 'swiper/modules';
import { useState } from 'react';
import 'swiper/css';

export default function Visual() {
	const [Index, setIndex] = useState(0);
	// reactQuery hook으로 isSuccess 정보값 가져옴
	const { data, isSuccess } = useFlickrQuery({ type: 'mine' });

	return (
		<figure className='visual'>
			<div className='textBox'>
				{data?.map((el, idx) => (
					<h2 key={idx} className={Index === idx ? 'on' : ''}>
						{el.title.substr(0, 30)}
					</h2>
				))}
			</div>

			<Swiper
				//autoplay 모듈 연결
				modules={[Autoplay]}
				slidesPerView={3}//한 화면에 보일 패널갯
				spaceBetween={100}//패널사이간격
				loop={true}//ture일때 좌우순환
				centeredSlides={true} //복수개의 패널을 보이게 설정시 활성화 패널을 가운데 배치
				onSlideChange={el => setIndex(el.realIndex)}//슬라이드 변경될 때마다 현재 활성화 패널순번을 index상태값에 저장(loop:ture)
			
				autoplay={{	delay: 2000,disableOnInteraction: true}} //autoplay 속성 (delay:인터벌시간, disableOnInteraction:true) 자동롤링시 인터벌 간격 2초, 사용자 이벤트 발생하면 롤링 중지, Swiper준비 완료시 파라미터로 swiper인스턴스 전달받고 해당 인스턴스로부터 전용 자동롤링 시작 메서드를 일초 있다가 강제 실행(SwiperSlide동적 생성시간 벌어줌)
				
				//스와이퍼기능이 아직 활성화되지 않은상태에서 autoplay가 적용안되는 이슈 발생
				//onSwiper : 모든 스와이퍼 모듈을 불러온뒤에 기능 적용할 준비완료시
				//해당 이벤트 발생시 자동적으로 파라미터를 통해 swiper인스턴스가 전달됨
				onSwiper={swiper => {
					//swiper컴포넌트의 준비가 완료되었더라도 리액트쿼리로 데이터를 받아서 동적으로 slide컴포넌트가 완성될때까지의 시간을 setTimeout으로 홀딩
					setTimeout(() => {
						//1초뒤에 SwiperSlide컴포넌트까지 완료시 전달받은 스와이퍼 인스턴스로 강제 롤링시작
						swiper.autoplay.start();
					}, 1000);
				}}>
				{/* 데이터 다 받아진 이후 동적 swiperSlide 생성 */}
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
			</Swiper>
		</figure>
	);
}
