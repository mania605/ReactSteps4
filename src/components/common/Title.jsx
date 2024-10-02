export default function Title({ color, text }) {
	return (
		<h1 className='title' style={{ color: color }}>
			{text}
		</h1>
	);
}
