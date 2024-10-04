import { useParams } from 'react-router-dom';
import Layout from '../common/Layout';
import { useEffect, useState } from 'react';
import useCombineText from '../../../hooks/useCombineText';

export default function YoutubeDetail() {
	//해당 컴포넌트 2번 재랜더링됨
	//YoubutVid상태값이 null상태로 렌더링되고 그때 fecthing가 받아온 데이터를 해당 상태에 담아주면서 2차 렌더링 발생
	const { id } = useParams();
	const [YoutubeVid, setYoutubeVid] = useState(null);
	const combineText = useCombineText();
	console.log(YoutubeVid);

	useEffect(() => {
		const api_key = import.meta.env.VITE_YOUTUBE_API;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&id=${id}`;

		fetch(url)
			.then(data => data.json())
			.then(json => {
				setYoutubeVid(json.items[0]);
			});
	}, []);

	//아래와 같이 첫번째 렌더링시에는 YoubutVid상태값이 null인 상태
	//null요소의 snippet라는 프로퍼티 접근을 하는 것이기 때문에 문법 에러 발생
	//두번째 렌더링시부터는 상태값이 담겨있으므로 에러발생하지 않음
	//해결 방법 : 처음 렌더링시 초기 상태값이 비어있을때 오류해결 방법 (Optional chaining)
	return (
		<Layout title={YoutubeVid?.snippet.title}>
			<figure>
				<iframe
					width='100%'
					height='100%'
					title='youtube'
					src={`https://www.youtube.com/embed/${YoutubeVid?.snippet.resourceId.videoId}`}></iframe>
			</figure>

			<p>{YoutubeVid?.snippet.description}</p>
			<span>{combineText(YoutubeVid?.snippet.publishedAt.split('T')[0], '-', '.')}</span>
		</Layout>
	);
}

//미션
//위에서 반환받은 데이터로 상세 데이터 호출
//제목, iframe 영상, 본문, 날짜 순으로 출력
