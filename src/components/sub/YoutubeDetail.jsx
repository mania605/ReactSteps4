import { useParams } from 'react-router-dom';
import Layout from '../common/Layout';
import { useEffect } from 'react';

export default function YoutubeDetail() {
	//useParms로 url을 통해 전달되는 파라미터값을 반환
	// 주소/youtube/abc (abc라는 값을 params객체로 전달받음)
	const { id } = useParams();

	useEffect(() => {
		//이전 목록화면에서 제목 클릭시 전달되는 id값을 params로 받아서
		//새로운 요청 url을 만들고 useEffect로 컴포넌트 마운트시 한번만 서버쪽에 데이터 요청후 배열값 전달 받음
		const api_key = import.meta.env.VITE_YOUTUBE_API;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&id=${id}`;

		fetch(url)
			.then(data => data.json())
			.then(json => {
				console.log(json);
			});
	}, []);

	return (
		<Layout title={'YOUTUBE DETAIL'}>
			<p>Posts Page contents come here.</p>
		</Layout>
	);
}

//미션
//위에서 반환받은 데이터로 상세 데이터 호출
//제목, iframe 영상, 본문, 날짜 순으로 출력
