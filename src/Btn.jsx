//rfce : 선언적함수 형태로 컴포넌트 생성
//rafce : 함수표현식 형태로 컴포넌트 생성

function BtnA() {
	return <div className='btnA'>BtnA</div>;
}

function BtnB() {
	return <div className='btnB'>BtnB</div>;
}

//하나의 jsx파일에서 복수개의 컴포넌트함수를 export 가능
export { BtnA, BtnB };
