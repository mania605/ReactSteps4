export default function Title({ color, children }) {
	return (
		<h1 className='title' style={{ color: color }}>
			{children}
		</h1>
	);
}

//미션 (10시 20분까지)
//해당 children속성을 활용해서 모든 서브페이지 동일한 구조의 틀을 유지하도록 Layout.jsx컴포넌트를 어떤식으로 구성할지 고민
