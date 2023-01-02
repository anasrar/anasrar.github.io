import dynamic from "next/dynamic";
import {
	// Accordion,
	ActionIcon,
	AspectRatio,
	Badge,
	Box,
	Button,
	Card,
	Checkbox,
	Chip,
	Code,
	Container,
	CopyButton,
	Divider,
	Flex,
	Grid,
	Group,
	Image,
	Kbd,
	List,
	Mark,
	MediaQuery,
	SegmentedControl,
	Slider,
	Spoiler,
	Stack,
	Switch,
	Tabs,
	ThemeIcon,
	Tooltip,
} from "@mantine/core";
import {
	useDebouncedState,
	useDebouncedValue,
	useDisclosure,
	useElementSize,
	useEventListener,
	useHover,
	useInputState,
	useInterval,
	useLocalStorage,
	useMediaQuery,
	useMove,
	useResizeObserver,
	useToggle,
} from "@mantine/hooks";
import { Prism } from "@mantine/prism";

const P = dynamic(() => import("./components").then((c) => c.P));
const A = dynamic(() => import("./components").then((c) => c.A));
const H = dynamic(() => import("./components").then((c) => c.H));

export const globals = {
	MantineCore: {
		AspectRatio,
		Container,
		Flex,
		Grid,
		Group,
		MediaQuery,
		Stack,

		ActionIcon,
		Button,
		CopyButton,

		Checkbox,
		Chip,
		SegmentedControl,
		Slider,
		Switch,

		Tabs,

		// Accordion,
		Badge,
		Card,
		Image,
		Kbd,
		Spoiler,
		ThemeIcon,

		Tooltip,

		Code,
		List,
		Mark,

		// Skeleton,

		Box,
		Divider,
	},
	MantineHooks: {
		useDebouncedState,
		useDebouncedValue,
		useDisclosure,
		useInputState,
		useLocalStorage,
		useToggle,

		useElementSize,
		useEventListener,
		useHover,
		useInterval,
		useMediaQuery,
		useMove,
		useResizeObserver,
	},
	MantinePrism: {
		Prism,
	},
	Markdown: { P, A, H },
};
