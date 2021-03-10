import React, { useState, ReactElement } from "react";
import {
	AppBar,
	IconButton,
	Toolbar,
	Box,
	Drawer,
	ListItem,
	ListItemIcon,
	ListItemText,
	Grid,
} from "@material-ui/core";
import clsx from "clsx";
import Link from "next/link";

import UIText from "components/UI/Text";
import UIButton from "components/UI/Button";
import PageLayout from "components/PageLayout";

import { useStyles, StyledList } from "./styles";

import { TiThMenu } from "react-icons/ti";
import { HiHome } from "react-icons/hi";
import { FaUserFriends } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";

interface NavItem {
	title: string;
	icon: any;
	href: string;
}
interface NavbarProps {
	children: JSX.Element | ReactElement;
}

export default function Navbar({ children }: NavbarProps): JSX.Element {
	const classes = useStyles();

	const [open, setOpen] = useState(true);

	const handleDrawer = () => setOpen(!open);

	const iconProps = {
		color: "var(--white)",
		size: 30,
	};

	return (
		<div className={classes.root}>
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar>
					<Grid container justify="space-between">
						<Grid item xs={3} container alignItems="center">
							<IconButton edge="start" onClick={handleDrawer}>
								<TiThMenu color="var(--t-disabled)" />
							</IconButton>
							<UIText size="18px" fontWeight={500}>
								Friends
							</UIText>
						</Grid>
						<Grid item xs={1} container>
							<UIButton>Login</UIButton>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					}),
				}}
			>
				<StyledList>
					<ListItem button>
						<ListItemText primary="&nbsp;" />
					</ListItem>
					{listItems.map((item, index) => (
						<div key={index}>
							<Link href={item.href}>
								<ListItem button>
									<ListItemIcon>{item.icon(iconProps)}</ListItemIcon>
									<ListItemText>
										<UIText textcolor="var(--white)" size="18px">
											{item.title}
										</UIText>
									</ListItemText>
								</ListItem>
							</Link>
						</div>
					))}
				</StyledList>
			</Drawer>
			<Box mt={10} width={`calc(100vw - ${open ? 250 : 36}px)`}>
				<PageLayout>{children}</PageLayout>
			</Box>
		</div>
	);
}

const listItems: NavItem[] = [
	{
		title: "Home",
		icon: (props: any) => <HiHome {...props} />,
		href: "/",
	},
	{
		title: "Amigos",
		icon: (props: any) => <FaUserFriends {...props} />,
		href: "/friends",
	},
	{
		title: "Cadastrar amigos",
		icon: (props: any) => <FiUserPlus {...props} />,
		href: "/friends/new",
	},
];
