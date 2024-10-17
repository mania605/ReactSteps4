import { createContext, useContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
	const [ModalOpen, setModalOpen] = useState(false);
	const [MobileOpen, setMobileOpen] = useState(false);

	return <GlobalContext.Provider value={{ ModalOpen, setModalOpen, MobileOpen, setMobileOpen }}>{children}</GlobalContext.Provider>;
};

export const useGlobalState = () => {
	return useContext(GlobalContext);
};