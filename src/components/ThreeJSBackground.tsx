import React from "react";
import styled from "@emotion/styled";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
// @ts-ignore: https://github.com/framer/motion/issues/1396
import { motion } from "framer-motion/three";
import { useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useState } from "@hookstate/core";

import VSDefault from "@/shaders/VSDefault";
import VSKeyboard from "@/shaders/VSKeyboard";
import FSNormal from "@/shaders/FSNormal";
import FSScreen from "@/shaders/FSScreen";

import { CursorText, CursorTextScale } from "@/states/Cursor";
import { PageShow } from "@/states/Page";

import CalculateCameraSavePosition from "@/utilities/CalculateCameraSavePosition";

const Wrapper = styled.section`
	position: fixed;
	display: block;
	left: 0;
	top: 0;
	width: 100vw;
	height: 100vh;
`;

const threeVariant = {
	hidden: {
		scale: 0,
	},
	show: {
		scale: 1,
		transition: {
			duration: 1,
			delay: 0,
		},
	},
	out: {
		scale: 0,
		transition: {
			duration: 1,
			delay: 0,
		},
	},
};

const Model: React.FC = () => {
	const { nodes } = useLoader(GLTFLoader, `/models/laptop.glb`);
	const keyboard = nodes.thinkpod_keyboard as THREE.Mesh;
	const panelBottom = nodes.thinkpod_panel_bottom as THREE.Mesh;
	const panelTop = nodes.thinkpod_panel_top as THREE.Mesh;
	const screen = nodes.thinkpod_screen as THREE.Mesh;
	const loading = nodes.loading as THREE.Mesh;

	const { camera } = useThree();

	const resizeHandler = () => {
		camera.position.setZ(CalculateCameraSavePosition());
	};

	React.useEffect(() => {
		window.addEventListener(`resize`, resizeHandler);
		resizeHandler();

		return () => {
			window.removeEventListener(`resize`, resizeHandler);
		};
	});

	const effect = useMotionValue(0.0);
	const effectSpring = useSpring(effect, { damping: 0.01, stiffness: 0.1 });

	const materialNormal = new THREE.ShaderMaterial({
		uniforms: {
			time: {
				value: 0,
			},
			effect: {
				value: 0.0,
			},
		},
		vertexShader: VSDefault,
		fragmentShader: FSNormal,
	});

	const materialKeyboard = new THREE.ShaderMaterial({
		uniforms: {
			time: {
				value: 0,
			},
			effect: {
				value: 0.0,
			},
		},
		vertexShader: VSKeyboard,
		fragmentShader: FSNormal,
	});

	const materialScreen = new THREE.ShaderMaterial({
		uniforms: {
			time: {
				value: 0,
			},
			effect: {
				value: 0.0,
			},
		},
		vertexShader: VSDefault,
		fragmentShader: FSScreen,
	});

	useFrame(({ clock }) => {
		materialNormal.uniforms.time.value = clock.elapsedTime;
		materialNormal.uniforms.effect.value = effectSpring.get();
		materialKeyboard.uniforms.time.value = clock.elapsedTime;
		materialKeyboard.uniforms.effect.value = effectSpring.get();
		materialScreen.uniforms.time.value = clock.elapsedTime;
		materialScreen.uniforms.effect.value = effectSpring.get();
	});

	const localPageShow = useState(PageShow);

	return (
		<AnimatePresence>
			{localPageShow.get() && (
				<motion.group
					variants={threeVariant}
					initial="hidden"
					animate="show"
					exit="out"
				>
					<motion.group
						initial={{ z: 0 }}
						animate={{ z: 0.3 }}
						transition={{ duration: 1, delay: 1.2 }}
					>
						<motion.group
							initial={{ rotateY: 0 }}
							animate={{ rotateY: Math.PI * 2 }}
							transition={{
								duration: 10,
								delay: 9,
								ease: `linear`,
								repeat: Infinity,
								repeatDelay: 0,
							}}
							onPointerOver={() => {
								effect.set(0);
								CursorText.set(() => `3D OBJECT`);
								CursorTextScale.set(() => 1);
							}}
							onPointerOut={() => {
								effect.set(1);
								CursorTextScale.set(() => 0);
							}}
						>
							<motion.group
								initial={{ rotateX: 0 }}
								animate={{ rotateX: Math.PI / 4 }}
								transition={{ duration: 1, delay: 1.2 }}
								onAnimationComplete={() => {
									effect.set(1);
								}}
							>
								<motion.mesh
									material={materialKeyboard}
									geometry={keyboard.geometry}
								/>
								<motion.mesh
									material={materialNormal}
									geometry={panelBottom.geometry}
								/>
							</motion.group>
							<motion.group
								initial={{ rotateX: 0 }}
								animate={{ rotateX: -Math.PI / 2 }}
								transition={{ duration: 1, delay: 1.2 }}
							>
								<motion.mesh
									material={materialNormal}
									geometry={panelTop.geometry}
								/>
								<motion.mesh
									material={materialScreen}
									geometry={screen.geometry}
								/>
							</motion.group>
						</motion.group>
					</motion.group>
					<motion.mesh
						initial={{ y: 0, z: 0.6, scale: 1 }}
						animate={{ scale: 0 }}
						transition={{ duration: 0.2, delay: 8.8 }}
						material={materialKeyboard}
						geometry={loading.geometry}
					/>
				</motion.group>
			)}
		</AnimatePresence>
	);
};

const ThreeJSBackground: React.FC = () => (
	<Wrapper>
		<Canvas camera={{ fov: 50, position: new THREE.Vector3(0, 0, 2) }}>
			<React.Suspense fallback={null}>
				<Model />
			</React.Suspense>
		</Canvas>
	</Wrapper>
);

export default ThreeJSBackground;
