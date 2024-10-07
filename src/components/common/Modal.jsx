export default function Modal({ children, setModalOpen }) {
	return (
		<aside className='modal'>
			<div className='con'>{children}</div>

			<button className='btnClose' onClick={() => setModalOpen(false)}>
				CLOSE
			</button>
		</aside>
	);
}
