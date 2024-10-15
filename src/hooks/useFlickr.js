import { useQuery } from '@tanstack/react-query';

//미션 (1시 40분까지)
//Gallery컴포넌트에 있는 fetch함수를 아래 fetchFlickr에 적용
//Gallery컴포넌트에서 아래 훅 호출한 뒤 데이터 출력

//fetchFn
//순서4 - useQuery를 통해서 전달된 opt값을 비구조화할당으로 queryKey로 뽑아서 fetching함수 내부로 전달
const fetchFlickr = async ({ queryKey }) => {
	const baseURL = 'https://www.flickr.com/services/rest/';
	const method_mine = 'flickr.people.getPhotos';
	const method_interest = 'flickr.interestingness.getList';
	const method_search = 'flickr.photos.search';

	const flickr_api = import.meta.env.VITE_FLICKR_API;
	const myID = '197119297@N02';
	const num = 20;
	let url = '';
	const urlMine = `${baseURL}?method=${method_mine}&api_key=${flickr_api}&user_id=${myID}&per_page=${num}&nojsoncallback=1&format=json`;
	const urlInterest = `${baseURL}?method=${method_interest}&api_key=${flickr_api}&per_page=${num}&nojsoncallback=1&format=json`;
	const urlSearch = `${baseURL}?method=${method_search}&api_key=${flickr_api}&per_page=${num}&nojsoncallback=1&format=json&tags=${queryKey[1].tag}`;

	queryKey[1].type === 'mine' && (url = urlMine);
	queryKey[1].type === 'interest' && (url = urlInterest);
	queryKey[1].type === 'search' && (url = urlSearch);

	const data = await fetch(url);
	const json = await data.json();
	//순서5- 해당 커스텀훅은 컴포넌트 외부에서 동작하는 함수이기 때문에 state함수 사용불가하고 단지 반환값을 내보내줌
	//해당 값이 자동으로 useQuery쿼리에 의해서 캐싱처리된 상태로 컴포넌트로 전달됨
	return json.photos.photo;
};

export const useFlickrQuery = opt => {
	return useQuery({
		queryKey: ['flickrQuery', opt],//순서2- 갤러리 컴포넌트로부터 전달받은 opt값을 내부 고유 쿼리키 생성하는데 활용
		queryFn: fetchFlickr, //순서3 - 쿼리키로 전달된 opt값을 fetchFlickr함수에 전달하면서 호출
		staleTime: 1000 * 60,
		gcTime: 1000 * 60
	});
};