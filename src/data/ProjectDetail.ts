import React from "react";

import IconPython from "@/icons/Python";
import IconBlender from "@/icons/Blender";
import IconUnrealEngine from "@/icons/UnrealEngine";
import IconJavaScript from "@/icons/JavaScript";
import IconQuestion from "@/icons/Question";

interface IStack {
	id: string;
	icon: React.FC;
	name: string;
}

interface ILink {
	id: string;
	link: string;
	text: string;
}

interface IProjectDetail {
	id: string;
	title: string;
	description: string;
	stacks: Array<IStack>;
	links: Array<ILink>;
}

const ProjectDetail: Array<IProjectDetail> = [
	{
		id: `A`,
		title: `Blender Unreal engine 4 Workspace`,
		description: `Blender add-on for better workflow with Unreal Engine 4`,
		stacks: [
			{
				id: `A`,
				icon: IconPython,
				name: `Python`,
			},
			{
				id: `B`,
				icon: IconBlender,
				name: `Blender`,
			},
			{
				id: `C`,
				icon: IconUnrealEngine,
				name: `Unreal Engine 4`,
			},
		],
		links: [
			{
				id: `A`,
				link: `//github.com/anasrar/Blender-UE4-Workspace`,
				text: `Repository`,
			},
			{
				id: `B`,
				link: `//anasrar.github.io/Blender-UE4-Workspace/`,
				text: `Documentation`,
			},
		],
	},
	{
		id: `B`,
		title: `ReNim`,
		description: `Blender add-on node-based retarget animation`,
		stacks: [
			{
				id: `A`,
				icon: IconPython,
				name: `Python`,
			},
			{
				id: `B`,
				icon: IconBlender,
				name: `Blender`,
			},
		],
		links: [
			{
				id: `A`,
				link: `//github.com/anasrar/ReNim`,
				text: `Repository`,
			},
			{
				id: `B`,
				link: `//blenderartists.org/t/renim-node-based-retarget-animation/1261958`,
				text: `Documentation`,
			},
		],
	},
	{
		id: `C`,
		title: `Orbit Jump`,
		description: `Game for js13kGames 2021, Got 76th Place`,
		stacks: [
			{
				id: `A`,
				icon: IconJavaScript,
				name: `JavaScript`,
			},
			{
				id: `B`,
				icon: IconQuestion,
				name: `Parcel.js`,
			},
			{
				id: `C`,
				icon: IconQuestion,
				name: `Kontra.js`,
			},
			{
				id: `D`,
				icon: IconQuestion,
				name: `ZzFX`,
			},
		],
		links: [
			{
				id: `A`,
				link: `//github.com/anasrar/orbit-jump`,
				text: `Repository`,
			},
			{
				id: `B`,
				link: `//js13kgames.com/games/orbit-jump/index.html`,
				text: `Play The Game`,
			},
		],
	},
];

export default ProjectDetail;
