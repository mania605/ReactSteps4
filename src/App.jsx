import Footer from './components/common/Footer';
import Header from './components/common/Header';
import Home from './components/main/Home';
import Contact from './components/sub/Contact';
import Gallery from './components/sub/Gallery';
import Members from './components/sub/Members';
import Posts from './components/sub/Posts';
import Youtube from './components/sub/Youtube';

export default function App() {
	return (
		<>
			<Header />

			<Home />
			<Members />
			<Gallery />
			<Youtube />
			<Contact />
			<Posts />

			<Footer />
		</>
	);
}
