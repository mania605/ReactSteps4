import Layout from '../common/Layout';
import { useState, useEffect } from 'react';

export default function Contact() {
	//순서1: 서버쪽에서 받아올 데이터를 담을 빈 배열 state공간및 함수 생성
	const [Data, setData] = useState([]);

	//순서2: 의존성배열이 비어있는 useEffect코드
	useEffect(() => {
		fetch('/data.json')
			.then(data => data.json())
			.then(json => {
				console.log(json);
				//순서3: 서버에서 가져온 데이터에서 배열만 뽑은 뒤 무조건 state에 옮겨담기
				setData(json.data);
			});
	}, []);

	return (
		<Layout title={'CONTACT'}>
			{Data.map((data, idx) => {
				return (
					// 순서4:반복시 무조건 idx로 키값 설정
					<article key={idx}>
						<h2>{data.name}</h2>
					</article>
				);
			})}
		</Layout>
	);
}

/*
  1. useState를 이용해서 state에 값을 옮겨담고 state변경함수로 state값 변경처리
  2. useEffect구문의 구조를 파악하고 의존성 배열의 역할
  3. useState와 useEffect를 활용해서 서버 데이터 fetching처리후 state에 담기
  4. 다이나믹 라우터를 이용해서  /youtube/:id를 활용해서 상세페이지에 특정 id값 전달하는 방법
  5. 상태값에 있는 객체를 불러올떄 ?. 형태로 옵셔녈 체이닝을 처리하는 이유
*/
