const Clamp = (min: number, value: number, max: number) =>
	Math.min(Math.max(value, min), max);

export default Clamp;
