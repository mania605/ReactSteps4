import Layout from '../common/Layout';
import memberData from '../../data/memberData';
import Pic from '../common/Pic';
import MaskBox from '../common/MaskBox';

export default function Members() {
	return (
		<Layout title={'MEMBERS'}>
			<article className='ceoBox'>
				<div className='txt'>
					<h2>{memberData[0].name}</h2>
					<p>{memberData[0].position}</p>
				</div>

				<MaskBox style={{ width: '50%', height: '65vh' }} delay={2}>
					<Pic className='pic' src={'/' + memberData[0].pic} shadow />
				</MaskBox>
			</article>

			<article className='memberListBox'>
				<div className='titBox'>
					<h2>Our Team Members</h2>
					<p>
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
