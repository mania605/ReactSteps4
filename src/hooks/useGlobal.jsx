import { createContext, useContext } from 'react';
export const initState = { isMenu: false, isModal: false };
export const ACTIONS = { SET_MENU_TOGGLE: 'SET_MENU_TOGGLE', SET_MENU_CLOSE: 'SET_MENU_CLOSE', SET_MODAL_OPEN: 'SET_MODAL_OPEN', SET_MODAL_CLOSE: 'SET_MODAL_CLOSE' };
export const reducer = (state, action) => {
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
export const GlobalState = createContext();
export const GlobalDispatch = createContext();
export const useGlobalState = () => {
	const context = useContext(GlobalState);
	if (!context) throw new Error('해당 훅은 GlobalStateProvider안쪽에서 호출되어야 합니다.');
	return context;
};
export const useGlobalDispatch = () => {
	const context = useContext(GlobalDispatch);
	if (!context) throw new Error('해당 훅은 GlobalDispatchProvider안쪽에서 호출되어야 합니다.');
	return context;
};