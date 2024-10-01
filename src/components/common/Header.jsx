import { FaEnvelope, FaInstagramSquare, FaYoutube } from 'react-icons/fa';

export default function Header() {
	return (
		<header className='header'>
			<h1>
				<a href='/'>ALPACO</a>
			</h1>

			<nav>
				<ul className='gnb'>
					<li>
						<a href='/members'>MEMBERS</a>
					</li>
					<li>
						<a href='/gallery'>GALLERY</a>
					</li>
					<li>
						<a href='/youtube'>YOUTUBE</a>
					</li>
					<li>
						<a href='/contact'>CONTACT</a>
					</li>
					<li>
						<a href='/posts'>POSTS</a>
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
