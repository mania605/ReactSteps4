export default function Modal({ children }) {
	return (
		<aside className='modal'>
			<div className='con'>{children}</div>
			<button className='btnClose'>CLOSE</button>
		</aside>
	);
}
