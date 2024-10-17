import { useGlobalState } from '../../hooks/useGlobal';

export default function MobileMenu() {
	const { menuDispatch } = useGlobalState();
	return (
		<aside className='mobileMenu' onClick={() => menuDispatch({ type: 'CLOSE' })}>
			MobileMenu
		</aside>
	);
}