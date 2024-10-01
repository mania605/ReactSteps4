import { FaEnvelope, FaInstagramSquare, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Header() {
	return (
		<header className='header'>
			<h1>
				<Link to={'/'}>ALPACO</Link>
			</h1>

			<nav>
				<ul className='gnb'>
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
