export default function useCombineText() {
	return (text, spc1, spc2) => text?.split(spc1).join(spc2);
}
