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
