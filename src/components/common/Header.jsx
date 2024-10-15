import { FaBars, FaEnvelope, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
	const gnbArr = ['members', 'gallery', 'youtube', 'contact', 'posts'];
	const snsArr = [FaEnvelope, FaInstagram, FaYoutube];

	const { pathname } = useLocation();

	return (
		//메인전용 헤더에 변경되는 부분이 극히 적으므로 기존 header클래스를 베이스로 하고 메인페이지에서는 main클래스만 추가
		<header className={"header ${pathname === '/' && 'main'}"}>
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

			<FaBars className='btnMenuToggle' />
		</header>
	);
}

/*
	미션 -
	Header 컴포넌트에서 모바일 메뉴 토글 버튼 클릭시 
	common / MobileMenu컴포넌트를 토글 형식으로 열리고 닫기도록 처리
	Modal.jsx작업 흐름을 참고해서 제작
*/