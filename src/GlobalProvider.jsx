import { useReducer } from 'react';
import { GlobalDispatch, GlobalState, initState, reducer } from './hooks/useGlobal';
export const GlobalProvider = ({ children }) => {
	const [store, dispatch] = useReducer(reducer, initState);
	return (
		<GlobalState.Provider value={{ store }}>
			<GlobalDispatch.Provider value={{ dispatch }}>{children}</GlobalDispatch.Provider>
		</GlobalState.Provider>
	);
};