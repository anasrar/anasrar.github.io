import {
	Children,
	FC,
	HTMLProps,
	PropsWithChildren,
	ReactElement,
} from "react";
import { usePathname } from "next/navigation";
import {
	ActionIcon,
	Blockquote,
	Code,
	CopyButton,
	Group,
	List,
	Table,
	Text,
	ThemeIcon,
	Title,
	TitleOrder,
	Tooltip,
} from "@mantine/core";
import { useStyles } from "./style";
import { A } from "./components";
import { IconCheck, IconLink, IconSquare } from "@tabler/icons";
import { ImageViewer } from "components/global/ImageViewer/component";
import { SvgViewer } from "components/global/SvgViewer/component";

const CustomP: FC<PropsWithChildren> = ({ children }) => {
	const childrens = Children.toArray(children);
	const firstElement = childrens[0] as ReactElement;

	if (childrens.length === 1 && typeof firstElement === "object") {
		switch (firstElement.type) {
			case "img":
				return (
					<ImageViewer
						src={firstElement.props.src}
						alt={firstElement.props.alt}
					/>
				);
			case "svg":
				if (firstElement.props.className === "mdx-svg") {
					return <SvgViewer>{children}</SvgViewer>;
				} else {
					return <>{children}</>;
				}
			default:
				return (
					<Text component="p" mt={0} mb="md" size="md">
						{children}
					</Text>
				);
		}
	} else {
		return (
			<Text component="p" mt={0} mb="md" size="md">
				{children}
			</Text>
		);
	}
};

const CustomPre: FC<HTMLProps<HTMLPreElement>> = ({ children }) => {
	return (
		<Code block mb="md">
			{children}
		</Code>
	);
};

const createHeading = (level: TitleOrder) => {
	const Result: FC<PropsWithChildren<{ id: string }>> = ({
		id = "none",
		children,
	}) => {
		const { classes } = useStyles();
		const host = typeof window === "undefined" ? "" : window.location.host;
		const pathname = usePathname();

		return (
			<Group position="apart" spacing="md" mb="md">
				<Title order={level} id={id} className={classes.scrollOffset}>
					{children}
				</Title>
				<CopyButton value={`${host}${pathname}#${id}`}>
					{({ copied, copy }) => (
						<Tooltip
							label={copied ? "Copied url" : "Copy url"}
							withArrow
							position="left"
						>
							<ActionIcon
								id={`link-${id}`}
								size="xs"
								color={copied ? "teal" : "gray"}
								onClick={copy}
								aria-label="Copy url"
							>
								{copied ? (
									<IconCheck size={16} />
								) : (
									<IconLink size={16} />
								)}
							</ActionIcon>
						</Tooltip>
					)}
				</CopyButton>
			</Group>
		);
	};

	return Result;
};

const UL: FC<HTMLProps<HTMLUListElement>> = ({
	className,
	children,
	type,
	ref,
	...props
}) => {
	return className === "contains-task-list" ? (
		<List type="unordered" listStyleType="none" mt="xs" mb="md" withPadding>
			{children}
		</List>
	) : (
		<List
			type="unordered"
			mt="xs"
			mb="md"
			withPadding
			className={className}
			{...props}
		>
			{children}
		</List>
	);
};

const OL: FC<HTMLProps<HTMLOListElement>> = ({ children }) => {
	return (
		<List type="ordered" mt="xs" mb="md" withPadding>
			{children}
		</List>
	);
};

const LI: FC<HTMLProps<HTMLLIElement>> = ({ id, className, children }) => {
	if (className === "task-list-item") {
		const childrens = Children.toArray(children);
		const firstElement = childrens[0] as ReactElement;
		const checked: boolean = firstElement.props.checked;

		return (
			<List.Item
				id={id}
				className={className}
				icon={
					checked ? (
						<ThemeIcon color="indigo" size="sm">
							<IconCheck size={14} />
						</ThemeIcon>
					) : (
						<ThemeIcon variant="outline" color="indigo" size="sm">
							<IconSquare size={14} color="transparent" />
						</ThemeIcon>
					)
				}
			>
				{childrens.splice(1)}
			</List.Item>
		);
	} else {
		return (
			<List.Item id={id} className={className}>
				{children}
			</List.Item>
		);
	}
};

const CustomTable: FC<HTMLProps<HTMLTableElement>> = ({
	children,
	ref,
	...props
}) => {
	return (
		<Table
			striped
			highlightOnHover
			withBorder
			withColumnBorders
			mb="md"
			{...props}
		>
			{children}
		</Table>
	);
};

export const substitution: Record<
	string,
	FC | typeof A | typeof Code | ReturnType<typeof createHeading>
> = {
	p: CustomP,
	a: A,
	code: Code,
	pre: CustomPre,
	h1: createHeading(1),
	h2: createHeading(2),
	h3: createHeading(3),
	h4: createHeading(4),
	h5: createHeading(5),
	h6: createHeading(6),
	ul: UL,
	ol: OL,
	li: LI,
	blockquote: Blockquote,
	table: CustomTable,
};
