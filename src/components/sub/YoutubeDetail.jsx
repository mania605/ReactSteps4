import { useParams } from 'react-router-dom';
import Layout from '../common/Layout';
import { useEffect, useState } from 'react';
import useCombineText from '../../../hooks/useCombineText';

export default function YoutubeDetail() {
	console.log('detail');
	const { id } = useParams();
	const [YoutubeVid, setYoutubeVid] = useState(null);
	const combineText = useCombineText();

	useEffect(() => {
		console.log('detail func');
		const api_key = import.meta.env.VITE_YOUTUBE_API;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&id=${id}`;

		fetch(url)
			.then(data => data.json())
			.then(json => {
				setYoutubeVid(json.items[0]);
			});
	}, []);

	return (
		<Layout title={YoutubeVid?.snippet.title}>
			<figure className='vidFrame'>
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

/*
	동적 라우터 (Dynamic Router) 
	- 상세페이지 같은 컨텐츠를 출력해야 될때 각각의 상세페이지 컨텐츠에 대응되는 컴포넌트를 만드는 것은 비효율적
	-  /:id 같은 형식으로 특정 URL 뒤에 값을 비어있는 상세페이지 컴포넌트에 전달
	- 상세 페이지 컴포넌트에서는 id값을 useParams() 훅을 통해 전달 받음
	- 이렇게 전달받은 고유 id 값을 이용해서 새롭게 상세 페이지 전용 데이터를 요청해서 받은 뒤 출력하는 형식

	동적 라우터를 확인해야 되는 컴포넌트 순서
	1. App.jsx에서 동적 라우터 패턴 확인 (:파라미터명)
	2. Youtube.jsx에서 클릭한 요소의 Link에 적용되어있는 이동 URL 확인
	3. YoutubeDetail.jsx에서 useParams()훅 호출한 뒤, 전달된 id값을 추출하고 해당 id값을 활용한 상세페이지 전용 컨텐츠 데이터 요청
*/
