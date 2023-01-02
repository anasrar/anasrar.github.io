// https://github.com/thednp/svg-path-commander/blob/e368f7c53148ee27ac6baee35b6c7863abb44470/src/util/shapeToPath.js#L95-L133
type RectPath = (attr: {
	x: number;
	y: number;
	rx?: number;
	ry?: number;
	width: number;
	height: number;
}) => string;

export const rectPath: RectPath = ({ x, y, width, height, rx = 0, ry = 0 }) => {
	if (rx || ry) {
		rx = !rx ? ry : rx;
		ry = !ry ? rx : ry;

		if (rx * 2 > width) rx -= (rx * 2 - width) / 2;
		if (ry * 2 > height) ry -= (ry * 2 - height) / 2;

		return `M ${x + rx} ${y}, h ${width - rx * 2} s ${rx} 0 ${rx} ${ry} v ${
			height - ry * 2
		}, s 0 ${ry} ${-rx} ${ry} h ${
			-width + rx * 2
		} s ${-rx} 0 ${-rx}, ${-ry} v ${
			-height + ry * 2
		} s 0 ${-ry} ${rx} ${-ry}`;
	}

	return `M ${x} ${y} h ${width} v ${height} H ${x} Z`;
};
