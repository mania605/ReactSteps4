import { FaBars, FaEnvelope, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useZustandStore } from '../../hooks/useZustand';

export default function Header() {
	console.log('header');
	const { setMenuToggle } = useZustandStore(state => state.setMenuToggle); // 필요한 상태만 구독

	const gnbArr = ['members', 'gallery', 'youtube', 'contact', 'posts'];
	const snsArr = [FaEnvelope, FaInstagram, FaYoutube];
	const { pathname } = useLocation();

	return (
		<>
			<header className={`header ${pathname === '/' && 'main'}`}>
				<h1>
					<Link to={'/'}>ALPACO</Link>
				</h1>

				<nav>
					<ul className='gnb'>
						{gnbArr.map((data, idx) => {
							return (
								<li key={idx} className={pathname === '/' + data ? 'on' : ''}>
									<Link to={'/' + data}>{data.toUpperCase()}</Link>
								</li>
							);
						})}
					</ul>

					<ul className='sns'>
						{snsArr.map((Data, idx) => (
							<li key={idx}>
								<Data />
							</li>
						))}
					</ul>
				</nav>

				<span className='btnMobile' onClick={setMenuToggle}>
					<FaBars />
				</span>
			</header>
		</>
	);
}