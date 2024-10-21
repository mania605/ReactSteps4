import Layout from '../common/Layout';
import memberData from '../../data/memberData';
import Pic from '../common/Pic';
import MaskBox from '../common/MaskBox';
import MaskText from '../common/MaskText';
import Content from '../common/Content';

export default function Members() {
	return (
		<Layout title={'MEMBERS'}>
			<MaskText delay={1}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, ad?</MaskText>
			<br />
			<MaskText delay={1.5} style={{ marginBottom: 80 }}>
				Lorem ipsum dolor
			</MaskText>

			<Content delay={1}>
				<article className='ceoBox'>
					<div className='txt'>
						<h2>{memberData[0].name}</h2>
						<p>{memberData[0].position}</p>
					</div>

					<MaskBox className='picWrapper' style={{ width: '50%', height: '65vh' }} delay={1}>
						<Pic style={{ width: '100%', height: '100%' }} src={'/' + memberData[0].pic} />
					</MaskBox>
				</article>

				<article className='memberListBox'>
					<div className='titBox'>
						<h2>Our Team Members</h2>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora possimus non ipsa cum. Veritatis, dolore aliquam? Consectetur assumenda dolor labore.</p>
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
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. A esse cupiditate, vitae deleniti repellat explicabo sit, corrupti beatae dicta, nulla optio corporis alias.
							Perferendis quidem sapiente minima, quisquam inventore soluta.
						</p>
					</div>
				</article>
			</Content>
		</Layout>
	);
}
 
/*
	미션
	- MaskText컴포넌트 아래쪽의 전체 서브페이지의 콘텐츠를 일괄적으로 페이드모션 처리
	- 해당 컨텐츠 모션을 모든 서브페이지 컴포넌트에 일일이 framer-motion적용하는 것은 비효율적
	- Layout컴포넌트에 추가하지 않으면서 각각의 서브페이지 컴포넌트의 특정 부분에 복잡하고 일괄적인 프레임기능 적용 필요
	- 작업1 : 서브페이지 컴포넌트 안쪽에서 컨텐츠 영역만 Wrapping처리해줄 Content.jsx 를 생성
	- 작업2 : Context.jsx의 children으로 각 페이지의 콘텐츠를 전달해주도록 처리
	- 작업3 : 각 서브페이지 컴포넌트에 Content컴포넌트를 Wrapper형태로 감싸서 각 페이지 전용 컨텐츠 내용 전달
	- 작업4 : Content.jsx안쪽에 페이드인 효과의 motion컴포넌트 처리
*/
