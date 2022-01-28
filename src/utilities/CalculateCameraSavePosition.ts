import Clamp from "./Clamp";
import Lerp1D from "./Lerp1D";

/**
 * Calulate Camera Save Position So Object Can Fully See Base On Width Viewport
 */
const CalculateCameraSavePosition: () => number = () => {
	const alpha = (Clamp(300, window.innerWidth, 1000) - 300) / 700;
	return Lerp1D(7, 2, alpha);
};

export default CalculateCameraSavePosition;
