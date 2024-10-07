import Layout from '../common/Layout';

export default function Gallery() {
	return (
		<Layout title={'GALLERY'}>
			<p>Gallery Page contents come here.</p>
		</Layout>
	);
}

/*
	useState, useEffect 훅을 활용해서 외부 서버데이터를 가져오고 컴포넌트에 렌더링하는 패턴
	1.외부데이터를 담을 State와 State변경함수를 useState로 부터 생성
	2.의존성 배열이 비어있는 useEffect구문 생성 (서버데이터는 컴포넌트 초기 렌더링시 한번만 가져오는 것이 일반적)
	3.useEffect구문 안쪽에서 데이터를 요청URL을 생성하기 위한 정보값 변수에 담기
	4.useEffect구문 안쪽에서 완성된 요청 URL로 fetch함수를 통해 데이터 요청
	5.fetch함수의 then구문 안에서 전달받은 서버데이터로부터 배열만 뽑아서 미리 준비해놓은 State에 State변경함수로 담기
	6.return문 안쪽에서 State값을 map으로 반복돌며 원하는 형태의 JSX로 출력
*/
