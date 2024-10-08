import Layout from '../common/Layout';
import memberData from '../../data/memberData';
import Pic from '../common/Pic';
import { useRef } from 'react';

/*
	참조객체에 가상돔을 담아 활용하는 패턴 
	1. useRef로 빈 참조객체 생성
	2. 원하는 가상돔요소 (JSX El) ref속성으로 참조객체 연결
	3. 참조객체명.current 로 해당요소를 가져와서 제어
*/

export default function Members() {
	//useRef를 통해서 초기값이 null이 있는 빈 참조 객체를 생성
	const pEl = useRef(null);
	console.log(pEl);

	//h2가상돔 요소 클릭
	const changeColor = () => {
		console.log(pEl);
		//const pEl = document.querySelector('.titBox p');
		//참조객체의 가상돔을 제어하면 현재 렌더링 사이클의 최신 가상돔 정보를 제어가능
		pEl.current.style.color = 'red';
	};

	return (
		<Layout title={'MEMBERS'}>
			<article className='ceoBox'>
				<div className='txt'>
					<h2>{memberData[0].name}</h2>
					<p>{memberData[0].position}</p>
				</div>
				<Pic className='pic' src={'/' + memberData[0].pic} shadow />
			</article>

			<article className='memberListBox'>
				<div className='titBox'>
					<h2 onClick={changeColor}>Our Team Members</h2>
					{/* 미리 생성한 빈 참조객체에 담고 싶은 가상돔요소에 ref속성으로 연결 */}
					<p ref={pEl}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
						possimus non ipsa cum. Veritatis, dolore aliquam? Consectetur
						assumenda dolor labore.
					</p>
				</div>

				<ul>
					{memberData.map((member, idx) => {
						if (idx !== 0) {
							return (
								<li key={idx}>
									{/* 이미지 컴포넌트 호출후 src에 이미지 url값 전달, pic클래스에는 이미지의 크기정도만 지정 */}
									<Pic src={member.pic} className='pic' shadow={true} />
									<div className='txt'>
										<h2>{member.name}</h2>
										<p>{member.position}</p>
									</div>
								</li>
							);
						}
					})}
				</ul>

				<div className='descBox'>
					<h2>Lorem ipsum dolor sit.</h2>
					<p>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. A esse
						cupiditate, vitae deleniti repellat explicabo sit, corrupti beatae
						dicta, nulla optio corporis alias. Perferendis quidem sapiente
						minima, quisquam inventore soluta.
					</p>
				</div>
			</article>
		</Layout>
	);
}
// 미션 (3시 40분까지)
// 카페에 있는 멤버페이지 하단 영역(memberListBox)을 최대한 비슷하게 스타일링
