// import{useQuery} from '@tanstack/react-query';

// const fetchFlickr = async opt => {
//   //opt {queryKey} 
// 		const baseURL = 'https://www.flickr.com/services/rest/';
// 		const method_mine = 'flickr.people.getPhotos';
// 		const method_interest = 'flickr.interestingness.getList';
// 		const method_search = 'flickr.photos.search';

// 		const flickr_api = import.meta.env.VITE_FLICKR_API;
// 		const myID = '197119297@N02';
// 		const num = 20;
// 		let url = '';
// 		const urlMine = `${baseURL}?method=${method_mine}&api_key=${flickr_api}&user_id=${myID}&per_page=${num}&nojsoncallback=1&format=json`;
// 		const urlInterest = `${baseURL}?method=${method_interest}&api_key=${flickr_api}&per_page=${num}&nojsoncallback=1&format=json`;
// 		//검색전용 url값 추가
// 		const urlSearch = `${baseURL}?method=${method_search}&api_key=${flickr_api}&per_page=${num}&nojsoncallback=1&format=json&tags=${opt.tag}`;

// 		opt.type === 'mine' && (url = urlMine);
// 		opt.type === 'interest' && (url = urlInterest);
// 		//순서5: 전달된 opt값의 type이 search이므로 위에서 준비한 검색 전용 호출 url을 아래쪽 fetch함수에 전달에서 검색 데이터 요청
// 		opt.type === 'search' && (url = urlSearch);

// 		const data = await fetch(url);
// 		const json = await data.json();
// 		setFlickr(json.photos.photo);
// 	};

//   export const useFlickrQuery = opt => {
//     return useQuery({
//       querykey:['infoFlickr', opt],
//       queryFn: fetchFlickr,
//       tatleTime: 1000 * 60,
//       gcTime:1000 *60
//     });
//   };
