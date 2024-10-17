import { createContext, useContext, useReducer } from 'react';

const initState = { isMenu: false, isModal: false };

const reducer = (state, action) => {
	if (action.type === 'TOGGLE') return { ...state, isMenu: !state.isMenu };
	if (action.type === 'CLOSE') return { ...state, isMenu: false };
	
	if (action.type === 'OPEN_MODAL') return { ...state, isModal: true };
	if (action.type === 'CLOSE_MODAL') return { ...state, isModal: false };
	else return state;
};

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
	const [store, dispatch] = useReducer(reducer, initState);
	return <GlobalContext.Provider value={{ store, dispatch }}>{children}</GlobalContext.Provider>;
};

export const useGlobalState = () => {
	return useContext(GlobalContext);
};

/*
	리액트에서 전역 상태관리의 개념 (context API 기반)

	store (객체): 컴포넌트 외부에서 전역으로 관리할 상태값이 담길 공간 (은행의 금고)
	reducer (함수): 전역 객체에 담겨있는 상태값을 변형해주는 변형자 함수 (금고에 접근할 수 있는 높은권한의 지점장)
	action (객체): 리듀서에게 전달할 변경할 데이터 요청값이 있는 객체정보 (입출금 요청서)
	dispatch (함수) : 리듀서에게 실제 action객체를 전달해주는 함수 (고객으로부터 입출금 요청서를 받아 지점장에게 전달해주는 은행 창구직원 )

	그럼 위와 같은 복잡한 흐름을 통해 전역 데이터를 관리하는 이유
	- 리액트로 구현되는 대단위 프로젝트에서는 상태(state) 정보의 관리가 중요함
	- 일반 컴포넌트 내부의 상태값은 해당 컴포넌트내에서만 사용되는 값이기 때문에 설사 문제가 발생을 해도 해당 컴포넌트로 오류 범위가 제한됨으로 큰 문제 발생안됨
	- 하지만 전역 상태값은 말그대로 무수하게 많은 하위컴포넌트들이 해당 전역 상태값을 공유하기 때문에 전역 상태값이 잘못되면 프로젝트 전반에 걸쳐 크리티컬한 오류 발생 가능
	- 전역 상태는 서로 다른 컴포넌트에서 데이터를 변경할 수 있는 리스크가 큰 만큼, 쉽게 전역 데이터를 변경하지 못하도록 강제하기 위한 틀이 필요
	- 위와 같은 이유로 useReducer사용 권장 : 개발자들끼리 서로 약속된 방식(리듀서, 액션객체)으로만 전역 상태값을 변경할 수 있도록 강제한 시스템적인 틀

	useReducer를 통해서 전역 데이터를 변경하는 구조적인 흐름
	1.전역 데이터를 수정할 리듀서 함수 생성
	2.해당 리듀서를 어떤 방식으로 변경할지 정할 action객체 정보 구조화
	3.컴포넌트에서 변경할 데이터를 미리 약속한 구조에 맞게 액션객체를 생성
	4.컴포넌트에서 생성된 액션 객체를 dispatch함수를 통해서 전달
	---------------------
	미리 지정한 리듀서 함수가 action객체를 dispatch를 통해 전달 받은 뒤
	실제 action객체의 내용에 따라 전역 store의 데이터를 변경처리
*/

/*
	자가 진단 항목
	1. createContext로 생성되는 GlobalContext는 모든 하위 컴포넌트에서 자유롭게 접근할 수 있는 전역 state공간
	2. 해당 파일에서 export하고 있는 GlobalProvider라는 컴포넌트는 전역 상태값을 App하위에 전달해주는 개념
	3. 해당 파일에서 export하고 있는 useGlobalState라는 커스텀훅은 자식 컴포넌트에서 전역 상태값에 접근하기 위한 함수
	4. GlobalProvider로 App컴포넌트를 Wrapping해서 전역 상태값을 전달하고 있는 흐름 파악
	5. 각 서브 컴포넌트에서 useGlobalState로 원하는 전역 상태값을 가져와서 사용 및 변경함수 호출
	
	실제 작업 흐름 순서별로 파악
	1. Gallery컴포넌트에 Modal컴포넌트를 열고 닫기 위한 전역상태값 흐름 숙지
	2. MobilMenu컴포넌트트 열고 닫기 위한 전역 상태값 흐름 숙지
	점심시간동안 미리 정리하면 좋을 사항
	- useContext 영상 숙지
	- useReducer 영상 숙지
	점심시간 이후에 진행할 내용
	- 해당 useContext로만 관리되고 있는 useGlobalState훅을 useReducer를 추가 도입해서 기능 고도화
	- useContext, useReducer조합으로 클라이언트 사이드 데이터 전역 상태관리할시의 문제점 파악
	- 위의 문제점을 개선하기 위한 zustand라는 전역상태 관리 라이브러리 개념 정리
	- zustand를 통한 클라이언트 사이드 데이터 관리 커스텀훅 추가 생성
*/