import emailjs from '@emailjs/browser';
import { useRef } from 'react';

export default function MailForm() {
	const ref_form = useRef(null);
	const ref_name = useRef(null);
	const ref_email = useRef(null);
	const ref_msg = useRef(null);

	//전송 이벤트 발생시 폼요소의 값을 비우기 위한 초기화 함수
	const resetForm = () => {
		[ref_name, ref_email, ref_msg].forEach(dom => (dom.current.value = ''));
	};

	//전송 버튼 클릭시 실행될 함수
	const sendForm = e => {
		e.preventDefault();

		emailjs
			.sendForm(import.meta.env.VITE_SERVICE_KEY, import.meta.env.VITE_TEMPLATE_KEY, ref_form.current, {
				publicKey: import.meta.env.VITE_PUBLIC_KEY
			})
			.then(res => {
				alert('문의내용이 관리자에 전달되었습니다.');
				console.log(res);
				resetForm();
			});
	};

	return (
		<article className='mailForm'>
			<div className='formBox'>
				{/* form에 전송 이벤트 연결 */}
				<form onSubmit={sendForm} ref={ref_form}>
					{/* 문의자이름, 메일주소 입력받는 상단 영역 */}
					<div className='upper'>
						<span>
							<label htmlFor='uName'>Name</label>
							<input ref={ref_name} name='user_name' type='text' id='uName' placeholder='Leave your name' />
						</span>
						<span>
							<label htmlFor='uMail'>E-Mail</label>
							<input ref={ref_email} name='user_email' type='text' id='uMail' placeholder='Leave your email' />
						</span>
					</div>

					{/* 문의내용 입력받는 textarea 하단 영역 */}
					<div className='lower'>
						<label htmlFor='msg'>Message</label>
						<textarea ref={ref_msg} name='message' id='msg' placeholder='Leave your message'></textarea>
					</div>

					{/* 전송,취소 버튼 그룹 */}
					<nav className='btnSet'>
						<input type='reset' value='Cancel' />
						<input type='submit' value='Send' />
					</nav>
				</form>
			</div>

			<div className='info'>
				<h2>Information</h2>
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate reprehenderit laudantium cupiditate qui? Possimus sint eum
					obcaecati ut cum ea, praesentium temporibus, quos vel beatae vero esse quisquam expedita animi.
				</p>
				<br />
				<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia, sequi ipsum. Deleniti nesciunt rerum ex!</p>
			</div>
		</article>
	);
}
