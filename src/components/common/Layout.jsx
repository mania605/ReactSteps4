export default function Layout({ title, children }) {
	return (
		<main className={title?.toLowerCase()}>
			<h1>{title}</h1>

			<section>{children}</section>
		</main>
	);
}
