export default function useShortenText() {
	return (text, len) => {
		return text.length > len ? text.substr(0, len) + '...' : text;
	};
}
