import Layout from '../common/Layout';
import memberData from '../../data/memberData';

export default function Members() {
	return (
		<Layout title={'MEMBERS'}>
			<article className='ceoBox'>
				<div className='txt'>
					<h2>{memberData[0].name}</h2>
					<p>{memberData[0].position}</p>
				</div>
				<div className='pic'>
					<img src={'/' + memberData[0].pic} alt={memberData[0].name} />
				</div>
			</article>

			<article className='memberListBox'>
				<div className='titBox'>
					<h2>Our Team Members</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora possimus non ipsa cum. Veritatis, dolore
						aliquam? Consectetur assumenda dolor labore.
					</p>
				</div>

				<ul>
					{memberData.map((member, idx) => {
						if (idx !== 0) {
							return (
								<li key={idx}>
									<div className='pic'>
										<img src={'/' + member.pic} alt={member.name} />
									</div>
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
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. A esse cupiditate, vitae deleniti repellat
						explicabo sit, corrupti beatae dicta, nulla optio corporis alias. Perferendis quidem sapiente minima,
						quisquam inventore soluta.
					</p>
				</div>
			</article>
		</Layout>
	);
}
// 미션 (3시 40분까지)
// 카페에 있는 멤버페이지 하단 영역(memberListBox)을 최대한 비슷하게 스타일링
