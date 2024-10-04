import { useParams } from 'react-router-dom';
import Layout from '../common/Layout';

export default function YoutubeDetail() {
	//useParms로 url을 통해 전달되는 파라미터값을 반환
	// 주소/youtube/abc (abc라는 값을 params객체로 전달받음)
	const params = useParams();
	console.log(params);

	return (
		<Layout title={'YOUTUBE DETAIL'}>
			<p>Posts Page contents come here.</p>
		</Layout>
	);
}
