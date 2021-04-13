// libs
import React, { useState, useEffect } from "react";
import {
	Box,
	Grid,
	Paper,
	CircularProgress,
	Dialog,
	DialogTitle,
	DialogContent,
} from "@material-ui/core";

// componentes
import { UIText, UITable, UISearch, UITableRow, UIButton } from "components/UI";

// validacao
import { useFormik } from "formik";
import { GenerateFormikField } from "utils/pages";

// icons
import { FaUserAlt, FaSyncAlt } from "react-icons/fa";

// shared
import api from "api/index";
import { useRouter } from "next/router";

interface FriendApi {
	id: number;
	name: string;
	birth_date: string;
	favorite_color: string;
	favorite_food: null;
	id_color: string;
	name_color: string;
	code: string;
}

export default function Friends() {
	const router = useRouter();

	const header: UITableRow = {
		row: [
			{ children: "ID" },
			{ children: "Nome" },
			{ children: "Data de nascimento" },
			{ children: "Cor favorita" },
		],
		header: true,
	};

	const [data, setData] = useState<UITableRow[]>();
	const {
		values,
		errors,
		touched,
		handleChange,
		handleBlur,
		setFieldValue,
	} = useFormik({
		initialValues: { search: "" },
		onSubmit: () => {},
	});

	const formikConfig = {
		values,
		errors,
		touched,
		handleChange,
		handleBlur,
		setFieldValue,
	};

	const [openModal, setOpenModal] = useState(false);
	const [openDialog, setOpenDialog] = useState(null);

	const handleEdit = (item: FriendApi) =>
		router.push(`/friends/new?id=${item.id}`);

	const handleDelete = async (item: FriendApi) => {
		setOpenModal(true);
		try {
			if (item && item.id) {
				const result = await api.get(`friends/delete.php`, {
					params: {
						idUser: item.id,
					},
				});
				if (Boolean(result.data)) {
					setOpenDialog("Usuário deletado com sucesso!!");
					getData();
					return null;
				}
				setOpenDialog("Operação cancelada, erro interno do servidor");
			}
		} catch {
			setOpenDialog("Operação cancelada, erro interno do servidor");
		} finally {
			setOpenModal(false);
		}
	};

	const getData = async () => {
		setOpenModal(true);
		try {
			const result = values.search
				? await api.get("friends/get.php", {
						params: {
							search: values.search,
						},
				  })
				: await api.get("friends/get.php");
			const data: FriendApi[] = await result.data;

			const names = ["id", "name", "birth_date"];

			const items = data.map((item) => {
				const cells = names.map((name) => ({ children: item[name] }));
				return {
					row: cells
						.concat({
							children: (
								<Grid container>
									<Grid item xs>
										{item["name_color"]}
									</Grid>
									<Grid item xs={1}>
										<Box
											bgcolor={item["code"]}
											width="15px"
											height="15px"
											borderRadius="50px"
										/>
									</Grid>
								</Grid>
							),
						})
						.concat({
							children: (
								<Grid container direction="column" spacing={2}>
									<Grid item>
										<UIButton onClick={() => handleEdit(item)}>
											Editar
										</UIButton>
									</Grid>
									<Grid item>
										<UIButton
											bgColor="var(--error)"
											onClick={() => handleDelete(item)}
										>
											Deletar
										</UIButton>
									</Grid>
								</Grid>
							),
						}),
				};
			});

			setData(items);
		} catch (err) {
			return null;
		} finally {
			setOpenModal(false);
		}
	};

	useEffect(() => {
		getData();
	}, [values.search]);

	return (
		<Box p={2}>
			<Grid container>
				<Grid item xs={12}>
					<Paper elevation={0}>
						<Box p={2}>
							<Grid container spacing={2}>
								<Grid item xs={12} container justify="space-around">
									<Grid item xs>
										<UIText size="25px">Amigos cadastrados</UIText>
									</Grid>
									<Grid item xs={3}>
										<UIButton
											fullWidth
											startIcon={<FaSyncAlt />}
											onClick={getData}
										>
											Atualizar
										</UIButton>
									</Grid>
								</Grid>
								<Grid item xs={12}>
									<UISearch
										btnText="Limpar"
										{...GenerateFormikField("search", formikConfig)}
										onSearch={() => setFieldValue("search", "")}
									/>
								</Grid>
								<Grid item xs={12}>
									<UITable data={data} header={header} />
								</Grid>
							</Grid>
						</Box>
					</Paper>
				</Grid>
			</Grid>
			<Dialog open={openModal} onClose={() => {}}>
				<DialogContent>
					<CircularProgress size={60} />
				</DialogContent>
			</Dialog>
			<Dialog
				open={openDialog ? true : false}
				onClose={() => setOpenDialog(null)}
			>
				<Box p={4}>
					<DialogTitle>
						<UIText color="var(--primary)" size="20px">
							{openDialog}
						</UIText>
					</DialogTitle>
					<Grid container justify="center">
						<FaUserAlt size={60} color="var(--primary)" />
					</Grid>
				</Box>
			</Dialog>
		</Box>
	);
}
