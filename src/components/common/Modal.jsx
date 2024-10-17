import { useGlobalState } from '../../hooks/useGlobal';

export default function Modal({ children }) {
	const { setModalOpen } = useGlobalState();
	return (
		<aside className='modal'>
			<div className='con'>{children}</div>

			<button className='btnClose' onClick={() => setModalOpen(false)}>
				CLOSE
			</button>
		</aside>
	);
}