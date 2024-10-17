import { createContext, useContext, useState } from 'react';
//createContext로 전역 컨텍스트 생성
export const GlobalContext = createContext();
//전역컨텍스트내부의 Provider를 Wrapping 컴포넌트 형태로 export
//이때 전역에서 관리하고자 하는 state값을 생성해서 value로 지정하면 {children}(App) 하위 컴포넌트 어디에서든 해당 값을 접근 가능
//최상위 루트 컴포넌트에 전역 상태값 전달시 필요
export const GlobalProvider = ({ children }) => {
	const [ModalOpen, setModalOpen] = useState(false);
	return <GlobalContext.Provider value={{ ModalOpen, setModalOpen }}>{children}</GlobalContext.Provider>;
};
//내부적으로 GlobalContext를 접근하게 해주는 useContext를 자동 호출해주는 useGlobalState커스텀 훅 생성
//하위 컴포넌트에서 전역 데이터 호출 시 필요
export const useGlobalState = () => {
	return useContext(GlobalContext);
};