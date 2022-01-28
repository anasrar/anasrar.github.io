import React from "react";
import styled from "@emotion/styled";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
// @ts-ignore: https://github.com/framer/motion/issues/1396
import { motion } from "framer-motion/three";
import { motion as motionhtml, AnimatePresence } from "framer-motion";
import { useState } from "@hookstate/core";

import Motion from "./Motion";
import Indicator from "./Indicator";

import DataProjectDetail from "@/data/ProjectDetail";

import { CursorText, CursorTextScale } from "@/states/Cursor";
import { ProjectSection } from "@/states/Project";

import CalculateCameraSavePosition from "@/utilities/CalculateCameraSavePosition";

const Wrapper = styled.section`
	position: fixed;
	inset: 0 auto auto 0;
	width: 100vw;
	height: 100vh;
`;

const IndicatorWraper = styled.section`
	position: fixed;
	inset: 50vh clamp(1em, 3vw, 2em) auto auto;
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
	gap: clamp(0.5em, 3vh, 0.75em);

	transform: translateY(-50%);

	mix-blend-mode: difference;
`;

const variantProjectSection = {
	enter: (direction: number) => ({
		y: direction > 0 ? -5 : 5,
		scale: 0,
	}),
	center: {
		y: 0,
		scale: 1,
	},
	out: (direction: number) => ({
		y: direction < 0 ? -5 : 5,
		scale: 0,
	}),
};

const mod = (current: number, max: number) => ((current % max) + max) % max;

const Model: React.FC = () => {
	const localProjectSection = useState(ProjectSection);
	const [page, direction, canScroll] =
		localProjectSection.get() as Array<number>;

	const { nodes } = useLoader(GLTFLoader, `/models/project.glb`);
	const blenderLogo = nodes.blender as THREE.Mesh;
	const blenderCircleLogo = nodes.blender_circle as THREE.Mesh;
	const ueLogo = nodes.ue as THREE.Mesh;
	const folder = nodes.folder as THREE.Mesh;
	const folderAsset = nodes.folder_asset as THREE.Mesh;
	const arrow = nodes.arrow as THREE.Mesh;
	const thigh = nodes.thigh as THREE.Mesh;
	const calf = nodes.calf as THREE.Mesh;
	const foot = nodes.foot as THREE.Mesh;
	const sThigh = nodes.s_thigh as THREE.Mesh;
	const sCalf = nodes.s_calf as THREE.Mesh;
	const sFoot = nodes.s_foot as THREE.Mesh;

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

	return (
		<Motion>
			<motion.group
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				exit={{ scale: 0 }}
				transition={{ duration: 1, delay: 0 }}
			>
				<AnimatePresence initial={false} custom={direction}>
					<motion.group
						key={page}
						custom={direction}
						variants={variantProjectSection}
						initial="enter"
						animate="center"
						exit="out"
						transition={{ y: { duration: 0.5, ease: `linear` } }}
						onAnimationComplete={() => {
							if (!canScroll) {
								localProjectSection.set([page, direction, 1]);
							}
						}}
					>
						<AnimatePresence custom={direction}>
							<motion.group
								onPointerOver={() => {
									CursorText.set(() => `3D OBJECT`);
									CursorTextScale.set(() => 1);
								}}
								onPointerOut={() => {
									CursorTextScale.set(() => 0);
								}}
							>
								{page === 0 && (
									<>
										<motion.group
											initial={{ x: -0.5 }}
											animate={{ x: [-0.5, -0.44, -0.5] }}
											transition={{
												duration: 0.5,
												times: [0, 0.7, 1],
												repeat: Infinity,
												delay: 1,
												repeatDelay: 3.5,
											}}
										>
											<mesh geometry={blenderLogo.geometry}>
												<meshStandardMaterial color="#EA7600" />
											</mesh>
											<mesh geometry={blenderCircleLogo.geometry}>
												<meshStandardMaterial color="#236192" />
											</mesh>
										</motion.group>
										<motion.mesh
											geometry={folder.geometry}
											initial={{ x: -0.35, z: 0.25 }}
											animate={{ x: [-0.35, 0.35, 0.35, -0.35, -0.35] }}
											transition={{
												duration: 4,
												times: [0, 0.25, 0.5, 0.75, 1],
												repeat: Infinity,
												delay: 1,
											}}
										>
											<meshStandardMaterial color="#FA0" />
											<motion.mesh
												geometry={folderAsset.geometry}
												initial={{ scaleY: 1 }}
												animate={{ scaleY: [1, 1.2, 1] }}
												transition={{
													duration: 0.5,
													times: [0, 0.5, 1],
													repeat: Infinity,
													delay: 1,
													repeatDelay: 1.5,
												}}
											>
												<meshStandardMaterial color="#FFF" />
											</motion.mesh>
										</motion.mesh>
										<motion.mesh
											geometry={ueLogo.geometry}
											initial={{ x: 0.5 }}
											animate={{ x: [0.5, 0.44, 0.5] }}
											transition={{
												duration: 0.5,
												times: [0, 0.7, 1],
												repeat: Infinity,
												delay: 3,
												repeatDelay: 3.5,
											}}
										>
											<meshStandardMaterial color="#FFF" />
										</motion.mesh>
									</>
								)}
								{page === 1 && (
									<>
										<motion.mesh
											geometry={arrow.geometry}
											position={[0, 0, 1]}
											animate={{ rotateY: [-0.5, 0.5, -0.5] }}
											transition={{
												duration: 5,
												times: [0, 0.5, 1],
												ease: `linear`,
												repeat: Infinity,
											}}
										>
											<meshStandardMaterial color="#cd1db0" />
										</motion.mesh>
										<group position={[0.5, 0, 0.5]}>
											<motion.mesh
												geometry={thigh.geometry}
												position={[0, 0.24, 0]}
												animate={{ rotateZ: [0, -1.25, 0] }}
												transition={{
													duration: 2.5,
													times: [0, 0.3, 1],
													delay: 1,
													repeat: Infinity,
													repeatDelay: 0.75,
												}}
											>
												<meshStandardMaterial color="#6261c9" />
												<motion.mesh
													geometry={calf.geometry}
													position={[0, -0.22, 0]}
													animate={{ rotateZ: [0, 2.5, 0] }}
													transition={{
														duration: 2.5,
														times: [0, 0.3, 1],
														delay: 1,
														repeat: Infinity,
														repeatDelay: 0.75,
													}}
												>
													<meshStandardMaterial color="#6261c9" />
													<motion.mesh
														geometry={foot.geometry}
														position={[0, -0.22, 0]}
														animate={{ rotateZ: [0, -1.25, 0] }}
														transition={{
															duration: 2.5,
															times: [0, 0.3, 1],
															delay: 1,
															repeat: Infinity,
															repeatDelay: 0.75,
														}}
													>
														<meshStandardMaterial color="#6261c9" />
													</motion.mesh>
												</motion.mesh>
											</motion.mesh>
										</group>
										<group position={[-0.5, 0, 0.5]}>
											<motion.mesh
												geometry={sThigh.geometry}
												position={[0, 0.24, 0]}
												animate={{ rotateZ: [0, -1.25, 0] }}
												transition={{
													duration: 2.5,
													times: [0, 0.3, 1],
													delay: 1,
													repeat: Infinity,
													repeatDelay: 0.75,
												}}
											>
												<meshStandardMaterial color="#cdc21d" />
												<motion.mesh
													geometry={sCalf.geometry}
													position={[0, -0.22, 0]}
													animate={{ rotateZ: [0, 2.5, 0] }}
													transition={{
														duration: 2.5,
														times: [0, 0.3, 1],
														delay: 1,
														repeat: Infinity,
														repeatDelay: 0.75,
													}}
												>
													<meshStandardMaterial color="#cdc21d" />
													<motion.mesh
														geometry={sFoot.geometry}
														position={[0, -0.22, 0]}
														animate={{ rotateZ: [0, -1.25, 0] }}
														transition={{
															duration: 2.5,
															times: [0, 0.3, 1],
															delay: 1,
															repeat: Infinity,
															repeatDelay: 0.75,
														}}
													>
														<meshStandardMaterial color="#cdc21d" />
													</motion.mesh>
												</motion.mesh>
											</motion.mesh>
										</group>
									</>
								)}
								{page === 2 && (
									<>
										<motion.mesh
											initial={{ scale: 1 }}
											animate={{ scale: 1.1 }}
											transition={{
												duration: 1,
												repeat: Infinity,
												repeatType: `mirror`,
											}}
										>
											<circleGeometry args={[0.6, 36]} />
											<meshStandardMaterial
												transparent={!0}
												opacity={0.25}
												color="#FFF"
											/>
										</motion.mesh>
										<motion.mesh
											initial={{ rotateX: Math.PI * 0.5 }}
											animate={{ rotateY: -Math.PI * 2 }}
											transition={{
												duration: 4,
												ease: `linear`,
												repeat: Infinity,
											}}
										>
											<cylinderGeometry args={[0.25, 0.25, 0.05, 36]} />
											<meshStandardMaterial color="#FFF" />
											<mesh position={[0.1, 0.05, 0.1]}>
												<cylinderGeometry args={[0.08, 0.08, 0.05, 36]} />
												<meshStandardMaterial color="#444" />
											</mesh>
											<mesh position={[-0.01, 0.05, -0.15]}>
												<cylinderGeometry args={[0.05, 0.05, 0.05, 36]} />
												<meshStandardMaterial color="#444" />
											</mesh>
											<mesh position={[-0.125, 0.05, 0.06]}>
												<cylinderGeometry args={[0.07, 0.07, 0.05, 36]} />
												<meshStandardMaterial color="#444" />
											</mesh>
										</motion.mesh>
										<motion.group
											animate={{ rotateZ: -Math.PI * 2 }}
											transition={{
												duration: 8,
												ease: `linear`,
												repeat: Infinity,
											}}
										>
											<group
												position={[-0.5, 0, 0]}
												rotation={[0, 0, Math.PI * -0.25]}
											>
												<mesh>
													<boxGeometry args={[0.1, 0.08, 0.04]} />
													<meshStandardMaterial color="#589EBF" />
												</mesh>
												<mesh position={[0, -0.02, -0.02]}>
													<boxGeometry args={[0.18, 0.18, 0.04]} />
													<meshStandardMaterial color="#FFF" />
												</mesh>
												<mesh position={[-0.08, -0.13, 0]}>
													<boxGeometry args={[0.08, 0.16, 0.06]} />
													<meshStandardMaterial color="#999" />
												</mesh>
												<mesh position={[0.08, -0.13, 0]}>
													<boxGeometry args={[0.08, 0.16, 0.06]} />
													<meshStandardMaterial color="#999" />
												</mesh>
											</group>
										</motion.group>
									</>
								)}
							</motion.group>
						</AnimatePresence>
					</motion.group>
				</AnimatePresence>
			</motion.group>
		</Motion>
	);
};

const ThreeJSBackgroundProject: React.FC = () => {
	const localProjectSection = useState(ProjectSection);
	const [page, direction, canScroll] =
		localProjectSection.get() as Array<number>;

	const wheelHandler = (event: WheelEvent) => {
		if (canScroll) {
			const newDirection: number = Math.sign(event.deltaY);
			localProjectSection.set([
				mod(page + newDirection, DataProjectDetail.length),
				newDirection,
				0,
			]);
		}
	};

	React.useEffect(() => {
		window.addEventListener(`wheel`, wheelHandler);

		return () => {
			window.removeEventListener(`wheel`, wheelHandler);
		};
	});

	const generateIndicatorHandler = (index: number) => () => {
		if (index !== page) {
			const newDirection: number = Math.sign(index - page);
			localProjectSection.set([index, newDirection, 0]);
		}
	};

	return (
		<>
			<Wrapper>
				<Canvas camera={{ fov: 50, position: new THREE.Vector3(0, 0, 2) }}>
					<ambientLight key={direction} />
					<pointLight position={[10, 10, 10]} />
					<React.Suspense fallback={null}>
						<Model />
					</React.Suspense>
				</Canvas>
			</Wrapper>
			<Motion>
				<motionhtml.section
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 1, ease: `linear` }}
				>
					<IndicatorWraper>
						{DataProjectDetail.map(({ id }, index) => (
							<Indicator
								onClick={generateIndicatorHandler(index)}
								key={id}
								active={page === index}
							/>
						))}
					</IndicatorWraper>
				</motionhtml.section>
			</Motion>
		</>
	);
};

export default ThreeJSBackgroundProject;
