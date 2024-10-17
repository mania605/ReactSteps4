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