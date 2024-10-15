import { useYoutubeQuery } from '../../hooks/useYoutube';
import Pic from '../common/Pic';

export default function Visual(){
	const { data } = useYoutubeQuery();
  return(
    <figure className='visual'>
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
    </figure>
  );
}