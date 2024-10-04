import Footer from './components/common/Footer';
import Header from './components/common/Header';
import Home from './components/main/Home';
import Gallery from './components/sub/Gallery';
import Members from './components/sub/Members';
import Posts from './components/sub/Posts';
import Youtube from './components/sub/Youtube';
import Contact from './components/sub/Contact';
import { Route, Routes } from 'react-router-dom';
import YoutubeDetail from './components/sub/YoutubeDetail';

export default function App() {
	return (
		<>
			<Header />

			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/members' element={<Members />} />
				<Route path='/gallery' element={<Gallery />} />
				<Route path='/youtube' element={<Youtube />} />
				<Route path='/youtube/:id' element={<YoutubeDetail />} />
				<Route path='/contact' element={<Contact />} />
				<Route path='/posts' element={<Posts />} />
			</Routes>

			<Footer />
		</>
	);
}

/*
	다이나믹 라우터 (상세페이지 제작)
	-라우터 연결시 path경로를 /패스명/:파라미터
	-특정 url경로 접속시 파라미터명으로 특정 값 전달
*/
