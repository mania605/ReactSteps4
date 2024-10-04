import { useState } from 'react';
import Layout from '../common/Layout';

export default function Youtube() {
	const [Colors, setColors] = useState(['red', 'green', 'blue']);

	//state값은 무조건 state변경함수를 통해서만 변경가능
	//변경할 값이 참조형자료이면 무조건 전개연산자를 통해서 완전복사해서 state전용변경함수로 변경처리
	const changeColor = () => {
		const newColors = [...Colors];
		newColors[0] = 'hotpink';
		setColors(newColors);
	};

	return (
		<Layout title={'YOUTUBE'}>
			<button onClick={changeColor}>set New Color</button>

			<ul>
				{Colors.map((color, idx) => {
					return (
						<li style={{ color: color }} key={idx}>
							{color}
						</li>
					);
				})}
			</ul>
		</Layout>
	);
}
