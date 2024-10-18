import { ACTIONS, useGlobalDispatch } from '../../hooks/useGlobal';
import { motion } from 'framer-motion';

export default function Modal({ children }) {
	const { dispatch } = useGlobalDispatch();
	return (
		<motion.aside className='modal'>
			<div className='con'>{children}</div>

			<button className='btnClose' onClick={() => dispatch({ type: ACTIONS.SET_MODAL_CLOSE })}>
				CLOSE
			</button>
		</motion.aside>
	);
}