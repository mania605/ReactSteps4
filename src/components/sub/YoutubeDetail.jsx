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

	useEffect(() => {
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
