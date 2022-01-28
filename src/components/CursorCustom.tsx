import React from "react";
import styled from "@emotion/styled";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState } from "@hookstate/core";

import { CursorText, CursorTextScale } from "@/states/Cursor";

const CursorBase = styled(motion.section)`
	position: fixed;
	display: flex;
	justify-content: center;
	align-items: center;
	left: 0;
	top: 0;
	width: 0;
	height: 0;

	mix-blend-mode: difference;
	pointer-events: none;
`;

const CursorPosition = styled.section`
	position: relative;
`;

const CursorCenter = styled.section``;

const CursorCustom: React.FC = () => {
	const cursorText = useState(CursorText);
	const cursorTextScale = useState(CursorTextScale);

	const [cursorScale, setCursorScale] = React.useState(0);
	const cursorX = useMotionValue(-100);
	const cursorY = useMotionValue(-100);

	const springConfig = { damping: 50, stiffness: 1500 };
	const cursorXSpring = useSpring(cursorX, springConfig);
	const cursorYSpring = useSpring(cursorY, springConfig);

	const cursorHandler = (event: MouseEvent) => {
		cursorXSpring.set(event.clientX);
		cursorYSpring.set(event.clientY);
	};
	const cursorOutHandler = () => {
		setCursorScale(0);
	};
	const cursorOverHandler = () => {
		setCursorScale(1);
	};
	const cursorDownHandler = (event: MouseEvent) => {
		if (event.buttons === 1) setCursorScale(2);
	};
	const cursorUpHandler = (_: MouseEvent) => {
		setCursorScale(1);
	};

	React.useEffect(() => {
		window.addEventListener(`mousemove`, cursorHandler);
		window.addEventListener(`mouseout`, cursorOutHandler);
		window.addEventListener(`mouseover`, cursorOverHandler);
		window.addEventListener(`mousedown`, cursorDownHandler);
		window.addEventListener(`mouseup`, cursorUpHandler);

		return () => {
			window.removeEventListener(`mousemove`, cursorHandler);
			window.removeEventListener(`mouseout`, cursorOutHandler);
			window.removeEventListener(`mouseover`, cursorOverHandler);
			window.removeEventListener(`mousedown`, cursorDownHandler);
			window.removeEventListener(`mouseup`, cursorUpHandler);
		};
	}, []);

	return (
		<CursorBase
			style={{
				y: cursorYSpring,
				x: cursorXSpring,
				originX: 0.5,
				originY: 0.5,
			}}
			initial={{ scale: 0 }}
			animate={{ scale: cursorScale }}
		>
			<CursorPosition>
				<CursorCenter>
					<svg viewBox="0 0 400 400" height="400px" width="400px">
						<defs>
							<path
								id="MyPath"
								d="M 200, 200 m -100, 0 a 100,100 0 1,1 200,0 a 100,100 0 1,1 -200,0"
							/>
						</defs>
						<motion.g
							initial={{ scale: 0 }}
							animate={{ scale: cursorTextScale.get() }}
						>
							<motion.text
								fontFamily="KharkivTone"
								fontSize="1.125em"
								fill="#fff"
								transform-origin="50% 50%"
								initial={{ rotate: 0 }}
								animate={{ rotate: 360 }}
								transition={{
									duration: 10,
									ease: `linear`,
									repeat: Infinity,
								}}
							>
								<textPath
									xlinkHref="#MyPath"
									startOffset="12.5%"
									textAnchor="middle"
								>
									{cursorText.get()}
								</textPath>
								<textPath
									xlinkHref="#MyPath"
									startOffset="37.5%"
									textAnchor="middle"
								>
									{cursorText.get()}
								</textPath>
								<textPath
									xlinkHref="#MyPath"
									startOffset="62.5%"
									textAnchor="middle"
								>
									{cursorText.get()}
								</textPath>
								<textPath
									xlinkHref="#MyPath"
									startOffset="87.5%"
									textAnchor="middle"
								>
									{cursorText.get()}
								</textPath>
							</motion.text>
						</motion.g>
						<circle cx="200" cy="200" r="16" fill="#FFF" />
					</svg>
				</CursorCenter>
			</CursorPosition>
		</CursorBase>
	);
};

export default CursorCustom;
