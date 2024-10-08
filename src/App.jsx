import Footer from './components/common/Footer';
import Header from './components/common/Header';
import Home from './components/main/Home';
import Gallery from './components/sub/Gallery';
import Members from './components/sub/Members';
import Posts from './components/sub/Posts';
import Youtube from './components/sub/Youtube';
import Contact from './components/sub/Contact';
import { Route, Routes, useLocation } from 'react-router-dom';
import YoutubeDetail from './components/sub/YoutubeDetail';
import { AnimatePresence } from 'framer-motion';

export default function App() {
	const location = useLocation();
	return (
		<>
			<Header />

			{/* 라우터를 통한 컴포넌트 전환시 이전 컴포넌트에 모션이 동작되고 있으면 해당 모션이 끝날때가지 컴포넌트 언마운트 시점을 지연처리 */}
			<AnimatePresence mode='wait'>
				{/* 라우터 이동시마다의 각 컴포넌트 고유값을 전달하기 위해서 각 컴포넌트마다의 path경로를 key로지정 */}
				<Routes location={location} key={location.pathname}>
					<Route path='/' element={<Home />} />
					<Route path='/members' element={<Members />} />
					<Route path='/gallery' element={<Gallery />} />
					<Route path='/youtube' element={<Youtube />} />
					<Route path='/youtube/:id' element={<YoutubeDetail />} />
					<Route path='/contact' element={<Contact />} />
					<Route path='/posts' element={<Posts />} />
				</Routes>
			</AnimatePresence>

			<Footer />
		</>
	);
}

/*
	다이나믹 라우터 (상세페이지 제작)
	-라우터 연결시 path경로를 /패스명/:파라미터
	-특정 url경로 접속시 파라미터명으로 특정 값 전달
*/
