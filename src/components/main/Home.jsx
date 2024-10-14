import { useYoutubeQuery } from '../../hooks/useYoutube';
import Layout from '../common/Layout';
import Pic from '../common/Pic';

export default function Home() {
	const { data } = useYoutubeQuery();
	return (
		<Layout title={'HOME'}>
			<div style={{ display: 'flex', gap: 40 }}>
				{data?.map((vid, idx) => {
					if (idx >= 3) return null;
					return (
						<article key={idx}>
							<Pic src={vid.snippet.thumbnails.high.url} style={{ width: 400, height: 200 }} shadow />
						</article>
					);
				})}
			</div>
		</Layout>
	);
}
/*
	미션 (4시 40분까지)
	- 메인 페이지인 해당 컴포넌트 안쪽에 useYoutubeQuery훅을 이용하여 유튜브 썸네일 미리보기 데이터를 3개만 출력
*/ 