import { useQuery } from '@tanstack/react-query';

//아래 커스텀훅에서 활용될 fetching함수
const fetchYoutube = async ({queryKey}) => {
console.log(queryKey[1]);
  const api_key = import.meta.env.VITE_YOUTUBE_API;
	const baseURL = 'https://www.googleapis.com/youtube/v3/playlistItems';
  const pidA = 'PLHtvRFLN5v-W5bQjvyH8QTdQQhgflJ3nu';
  const pidB = 'PLHtvRFLN5v-W5bQjvyH8QTdQQhgflJ3nu';
	const num = 10;
  let url = '';

	const urlA = `${baseURL}?part=snippet&playlistId=${pidA}&key=${api_key}&maxResults=${num}`; 
  const urlB = `${baseURL}?part=snippet&playlistId=${pidB}&key=${api_key}&maxResults=${num}`; 

queryKey[1].type === 'A' && (url = urlA);
queryKey[1].type === 'B' && (url = urlB);

  const data=await fetch(url);
	const json = await data.json();
	return json.items; 
}; 

//useQuery기능이 내장된 실제 호출된 커스텀훅
export const useYoutubeQuery = (opt={type:'A'}) =>{

  return useQuery({
    queryKey: ['youtubeList', opt],
    queryFn: fetchYoutube,
    staleTime: 1000*60,  //1초 x 60 1분
    gcTime: 1000*60
  });
}


/*
1. 유튜브 데이터 fetching 함수(전달될 인수값 필요) 

2. useQuery활용한 커스텀 훅 함수
- queryKey : 쿼리 키 필요 요청 url을 활용해서 각 서버데이터 마다의 고유 쿼리키를 배열형태로 등록
- queryFn:  위에서 미리 제작한 유튜브 fetching함수 등록
- StaleTime: 불러온 서버 데이터의 refetching금지시간을 설정
- gcTime :garbage colletion Time  더이상 사용되지 않는 서벋이터를 메모리 해제하기까지의 시간 설정

위의 useQuery를 활용한 커스텀훅으로 부터 반환된 데이터는 미리 설정한 옵션대로 브라우저단에서 캐싱처리되며 재활용됨
데이터가 변경되면(요청url인 queryKey값이 달라지면) 다시 새롭게 fetching처리

3. useQuery가 쿼리키를 통해서 관리하는 서버사이드 데이터의 4가지 상태 분류
 -pending: 데이터 요청 후 응답받기까지의 상태 
  -fresh: 데이터를 최신상태로 인식해서 재요청할 필요가 없는 상태
 -stale: 데이터를 오래된 상태로 인식해서 재요청할 필요가 있는 상태
 -inactive: 현재 출력되고 있는 컴포넌트에 사용되고 있지 않는 상태

 -서버데이터가 컴포넌트에서 활용되다가 해당 서버데이터를 활용하지 않는 다른 컴포넌트 마운트시
 해당 서버데이터는 innactive상태로 전환됨
 -inacctive상태에 돌입하면 그때부터 작업자가 설정한 gcTime이 소진되기 시작,
  -inactive상태에서 gcTime이 소진완료되면 garbage collection처리됨 (메모리에서 해제됨)

*/
 