import Title from '../common/Title';

export default function Home() {
	return (
		<main className='home'>
			<Title color={'blue'}>
				<span>HOME</span>
			</Title>
		</main>
	);
}
// 위와 같이 컴포넌트를 wrapping형태로 호출시
// 자식 컴포넌트 wrapping된 안쪽의 내용을 props.children을 전달 받음

//복잡 구조의 데이터를 자식 컴포넌트 전달할때 주로 사용
