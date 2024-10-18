import { FaBars, FaEnvelope, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useZustandStore } from '../../hooks/useZustand';

export default function Header() {
	console.log('header');
	//해당 컴포넌트는 setMemuToggle이라는 전역상태변경함수가 호출시에만 리랜더링 되도록 선택적 상태구독 처리
	const setMenuToggle = useZustandStore(state => state.setMenuToggle);

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