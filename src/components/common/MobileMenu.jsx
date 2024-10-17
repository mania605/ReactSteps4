import { useGlobalState } from '../../hooks/useGlobal';

export default function MobileMenu() {
	const { dispatch } = useGlobalState();
	return (
		<aside className='mobileMenu' onClick={() => dispatch({ type: 'CLOSE' })}>
			MobileMenu
		</aside>
	);
}