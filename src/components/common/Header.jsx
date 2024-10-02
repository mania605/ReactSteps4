import { FaEnvelope, FaInstagramSquare, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Header() {
	const gnbArr = ['members', 'gallery', 'youtube', 'contact', 'posts'];
	const snsArr = [FaEnvelope, FaInstagramSquare, FaYoutube];
	return (
		<header className='header'>
			<h1>
				<Link to={'/'}>ALPACO</Link>
			</h1>
			<nav>
				<ul className='gnb'>
					{gnbArr.map((data, idx) => {
						return (
							<li key={idx}>
								<Link to={'/' + data}>{data.toUpperCase()}</Link>
							</li>
						);
					})}
				</ul>

				<ul className='sns'>
					{/* 화살표함수 특성상 JSX반환시 { return } 문은 생략 가능 */}
					{snsArr.map((Data, idx) => (
						<li key={idx}>
							<Data />
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}
