export default function Modal({ children, setModalOpen }) {
	return (
		<aside className='modal'>
			<div className='con'>{children}</div>

			{/* 상태 변경함수를 전달받아서 이벤트 발생시 부모의 상태값을 변경해서 닫기 처리 */}
			<button className='btnClose' onClick={() => setModalOpen(false)}>
				CLOSE
			</button>
		</aside>
	);
}
