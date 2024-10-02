export default function Title({ color, text, children }) {
	return (
		<h1 className='title' style={{ color: color }}>
			{children}
		</h1>
	);
}
