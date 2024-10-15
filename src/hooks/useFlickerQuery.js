import { useQuery } from '@tanstack/react-query';

// Fetching 함수 정의
const fetchFlickr = async ({ queryKey }) => {
	const baseURL = 'https://www.flickr.com/services/rest/';
	const method_mine = 'flickr.people.getPhotos';
	const method_interest = 'flickr.interestingness.getList';
	const flickr_api = import.meta.env.VITE_FLICKR_API;
	const myID = '197119297@N02';
	const num = 20;
	let url = '';
	const urlMine = `${baseURL}?method=${method_mine}&api_key=${flickr_api}&user_id=${myID}&per_page=${num}&nojsoncallback=1&format=json`;
	const urlInterest = `${baseURL}?method=${method_interest}&api_key=${flickr_api}&per_page=${num}&nojsoncallback=1&format=json`;

	// 옵션에 따른 URL 선택
	const opt = queryKey[1];
	if (opt.type === 'mine') {
		url = urlMine;
	} else if (opt.type === 'interest') {
		url = urlInterest;
	}

	// API 호출
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}
	const data = await response.json();
	return data.photos.photo; // 사진 데이터 반환
};

// 리액트 쿼리 기반 커스텀 훅
export const useFlickrQuery = (opt = { type: 'interest' }) => {
	return useQuery(['flickrPhotos', opt], fetchFlickr, {
		staleTime: 1000 * 60 * 5, // 데이터가 5분간 유효
		cacheTime: 1000 * 60 * 30 // 30분 동안 캐시에 유지
	});
};
