import { motion } from 'framer-motion';
	import { useZustandStore } from '../../hooks/useZustand';

export default function Modal({ children }) {
	console.log('modal');
	const { setModalClose } = useZustandStore();
	
	return (
		<motion.aside className='modal'>
			<div className='con'>{children}</div>

			<button className='btnClose' onClick={setModalClose}>
				CLOSE
			</button>
		</motion.aside>
	);
}