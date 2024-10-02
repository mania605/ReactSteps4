export default function Title(props) {
	console.log(props);
	return <h1 className='title'>{props.text}</h1>;
}

//미션 - 9시 40분까지
//해당 타이틀 컴포넌트를 부모에서 호출할때
//color를 props로 글자 색상값을 전달받아서
//h1에 원하는 글자색상이 적용되도록 처리
