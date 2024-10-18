import { createContext, useContext, useReducer } from 'react';

const initState = { isMenu: false, isModal: false };
//컴포넌트에서 데이터 호출시 action객체의 타입명의 오타를 방지하기 위해 앱션타입을 상수형태로 등록하면 컴포넌트에서 호출 가능하며 추구 액션타입명을 손쉽게 변경 가능
export const ACTIONS = { SET_MENU_TOGGLE: 'SET_MENU_TOGGLE', SET_MENU_CLOSE: 'SET_MENU_CLOSE', SET_MODAL_OPEN: 'SET_MODAL_OPEN', SET_MODAL_CLOSE: 'SET_MODAL_CLOSE' };

//기존 if문을 아래와 같이 switch문으로 변환 가능
const reducer = (state, action) => {
	switch (action.type) {
		case ACTIONS.SET_MENU_TOGGLE:
			return { ...state, isMenu: !state.isMenu };
		case ACTIONS.SET_MENU_CLOSE:
			return { ...state, isMenu: false };
		case ACTIONS.SET_MODAL_OPEN:
			return { ...state, isModal: true };
		case ACTIONS.SET_MODAL_CLOSE:
			return { ...state, isModal: false };
		default:
			return state;
	}
};

//해당 전역 컨텍스트는 외부 컴포넌트에서 호출할 일이 없으므로 export 불필요
const GlobalState = createContext();
const GlobalDispatch = createContext();

//state전역 컨텍스트와 dispatch전역 컨텍스트를 따로 분리해서 아래와같이 별로의 Provider로 중첩해서 루트 컴포넌트를 감싸도록 설정
//이유 : 별도의 Provider로 분리해놓으면 전역 dispatch, 전역 state만 사용하는 컴포넌트의 불필요한 재랜더링을 방지 가능
//기존 하나의 Provider로 전역 state, 전역 dispatch를 같이 전달하면 state만 변경되는 컴포넌트뿐만 아닌 dispatch를 활용하는 컴포넌트도 불필요하게 재랜더링됨
//결국 위와 같은 이유는 하나의 Provider에는 하나의 전역 컨텍스트를 전달해야지만 불필요한 컴포넌트의 재랜더링을 막을 수 있음
//하지만 위와 같이 작업을 하면 너무 과한 Provider 중첩관계로 인해 코드 가독성이 떨어지고 관리도 어려워짐
//위의 문제를 해결하기 위해 zustand라는 외부 라이브러리 사용 추천
export const GlobalProvider = ({ children }) => {
	const [store, dispatch] = useReducer(reducer, initState);
	return (
		<GlobalState.Provider value={{ store }}>
			<GlobalDispatch.Provider value={{ dispatch }}>{children}</GlobalDispatch.Provider>
		</GlobalState.Provider>
	);
};

//GlobalState만 호출하는 커스텀훅
export const useGlobalState = () => {
	const context = useContext(GlobalState);
	if (!context) throw new Error('해당 훅은 GlobalStateProvider안쪽에서 호출되어야 합니다.');
	return context;
};

//Global dispatch함수만 호출하는 커스텀훅
export const useGlobalDispatch = () => {
	const context = useContext(GlobalDispatch);
	if (!context) throw new Error('해당 훅은 GlobalDispatchProvider안쪽에서 호출되어야 합니다.');
	return context;
};