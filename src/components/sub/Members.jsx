import Layout from '../common/Layout';
import memberData from '../../data/memberData';
import Pic from '../common/Pic';
import { useRef, useState } from 'react';

export default function Members() {
	console.log('Member rendered!!');
	const refEl = useRef(0);
	const [Num, setNum] = useState(0);

	const changeRef = () => {
		console.log('changeRef called');
		refEl.current = 1;
	};

	const changeState = () => {
		console.log('changeState called');
		setNum(Num + 1);
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
					<h2 onClick={changeRef}>Our Team Members</h2>
					<p onClick={changeState}>
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

/*
	state
	- 컴포넌트가 재랜더링 되더라도 값이 사라지지 않고 계속 유지 (이전값을 기억하면서 재활용가능)
	- 해당 값이 변경되면 자동으로 컴포넌트가 재랜더링됨
	- 사용예: JSX 변화와 관련된 모든값은 state에 담아줌, 서버데이터, 모달을 열기위한 불린값, 목록클릭시 변경되야 되는 순서값

	useRef
	- 컴포넌트가 재랜더링 되더라도 값이 사라지지 않고 계속 유지 (이전값을 기억하면서 재활용가능)
	- 해당 값이 변경되더라도 컴포넌트를 재렌더링시키지 않음
	- 사용예 : 화면의 렌더링과 직접적인 연관은 없지만 로직활용시 유지되야 되는 값
	- 사용예2: 브라우저 리사이즈시 갱신되야되는 브라우저의 폭, 스크롤시 갱신해야 되는 현재 스크롤 위치

	컴포넌트함수가 재랜더링(재호출) 되더라도 state와 useRef의 값을 기억할 수 있는 이유
	- 컴포넌트 함수는 lexical scope의 closure환경을 기반으로한 고차함수 구조로 동작되기 때문
*/
