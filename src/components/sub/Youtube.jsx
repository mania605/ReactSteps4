import { useState, useEffect } from 'react';
import Layout from '../common/Layout';

export default function Youtube() {
	const [Vids, setVids] = useState([]);
	console.log(Vids);

	const api_key = 'AIzaSyCtJt2jnOcXV6eLUZmF2gT6LGa3mSPkpbM';
	const pid = 'PLHtvRFLN5v-W5bQjvyH8QTdQQhgflJ3nu';
	const num = 10;
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${pid}&key=${api_key}&maxResults=${num}`;

	//기존적으로 리액트는 state값 변경을 자동으로 인지해서 자기자신 컴포넌트 함수를 재호출해서
	//해당 state 정보값에 기반한 새로운 JSX르 반환으로  화면의 변경점 갱신
	//위의 관점에서 봤을떄 useEffect를 활용하지 않고 바로 서버데이터를 state에 담으면
	//처음 마운트시 서버에서 데이터를 가져오고 해당 데이터를 state에 담자마자 컴포넌트는 재호출됨
	//컴포넌트가 재호출되면 다시 또다시 서버데이터를 가져오고  다시 state에 담음 - 이와 같이 위의 로직이 무한반복 처리됨
	//해결방법 : 의존성배열이 비어있는 useEffect의 콜백함수 안쪽에서 data fetching 및 state에 담는 로직을 호출해서
	//컴포넌트 마운트시 처음 한번만 호출되도록 강제해야 함

	//미션
	//11시 5분까지 직적 useEffect로 위의 이슈사항 해셜

	// fetch(url)
	// 	.then(data => data.json())
	// 	.then(json => {
	// 		const youtubeArr = json.items;
	// 		setVids(youtubeArr);
	// 	});

	return <Layout title={'YOUTUBE'}></Layout>;
}
