import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.scss';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { GlobalProvider } from './hooks/useGlobalContext.js';

//쿼리키 : 리액트가 서버데이터 fetching시 데이터의 구분을 하기위한 고유의 인식표
//리액트는 해당 쿼리키를 통해 서버데이터의 차이점을 구분
//서버데이터마다의 쿼리키를 전역에서 모든 컴포넌트가 공유하기 위한 인스턴스 객체
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(//queryClient를 전용 Provider컴포넌트를 통해 전달하면 내부의 모든 컴포넌트는 같은 서버데이터를 쿼리키로 구분해서 재활용 가능
	<QueryClientProvider client={queryClient}>
		<BrowserRouter>
			<GlobalProvider>
				<App />
			</GlobalProvider>
		</BrowserRouter>
		<ReactQueryDevtools />
	</QueryClientProvider>
);