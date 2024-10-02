import { FaEnvelope, FaInstagramSquare, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Header() {
	const gnbArr = ['members', 'gallery', 'youtube', 'contact', 'posts'];
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
					<li>
						<FaYoutube />
					</li>
					<li>
						<FaInstagramSquare />
					</li>
					<li>
						<FaEnvelope />
					</li>
				</ul>
			</nav>
		</header>
	);
}

/*
	<li>
		<Link to={'/members'}>MEMBERS</Link>
	</li>
	<li>
		<Link to={'/gallery'}>GALLERY</Link>
	</li>
	<li>
		<Link to={'/youtube'}>YOUTUBE</Link>
	</li>
	<li>
		<Link to={'/contact'}>CONTACT</Link>
	</li>
	<li>
		<Link to={'/posts'}>POSTS</Link>
	</li>
*/
