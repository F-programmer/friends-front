// libs
import React, { useEffect, useState } from "react";
import {
	Box,
	Grid,
	Paper,
	CircularProgress,
	Dialog,
	DialogTitle,
	DialogContent,
} from "@material-ui/core";

// components
import { UIInput, UIButton, UIText, UIAutocomplete } from "components/UI";

import { useFormik } from "formik";
import { GenerateFormikField, getOnlyOneError } from "utils/pages";
import * as yup from "yup";

// icons
import { FaUserAlt } from "react-icons/fa";

// shared
import { useRouter } from "next/router";
import api from "api/index";

const validationSchema = yup.object().shape({
	name: yup.string().required("Insira o nome"),
	birthDate: yup.string().required("Selecione uma data"),
	preferedColor: yup.object().shape({
		code: yup.string().required("Selecione uma opção"),
		id_color: yup.string().required("Selecione uma opção"),
		name_color: yup.string().required("Selecione uma opção"),
	}),
});

interface Color {
	id: string;
	name: string;
	code: string;
}
interface FormikValues {
	name: string;
	birthDate: string;
	preferedColor: Color | any;
}

export default function NewFriend() {
	const router = useRouter();
	const idFriend = String(router.query.id || "");

	const [editing, setEditing] = useState<any>(null);

	const initialValues: FormikValues = {
		name: "",
		birthDate: "",
		preferedColor: {},
	};
	const {
		values,
		errors,
		touched,
		handleChange,
		handleBlur,
		setFieldValue,
		handleSubmit,
		resetForm,
	} = useFormik({
		initialValues,
		validationSchema,
		onSubmit: async (fields: FormikValues) => {
			setOpenModal(true);
			try {
				const data = new FormData();
				Object.keys(fields).forEach((key) => data.append(key, fields[key]));
				data.append("preferedColor", fields.preferedColor.id_color);
				if (!editing) {
					const result = await api.post(`friends/post.php`, data);
					if (Boolean(result.data)) {
						setOpenDialog("Usuário cadastrado com sucesso!!");
						resetForm();
					}
				} else {
					data.append("idUser", editing.id);
					const result = await api.post(`friends/update.php`, data);
					if (Boolean(result.data)) {
						setOpenDialog("Usuário alterado com sucesso!!");
						resetForm();
					}
				}
			} catch (err) {
				setOpenDialog("Operação cancelada, erro interno do servidor");
				return null;
			} finally {
				setOpenModal(false);
			}
		},
	});
	const formikConfig = {
		values,
		errors,
		touched,
		handleChange,
		handleBlur,
		setFieldValue,
	};

	useEffect(() => {
		const getEditing = async () => {
			if (idFriend) {
				const result = await api.get(`friends/find.php`, {
					params: { idFriend },
				});
				if (result.data) {
					const data = result.data;
					if (data.length > 0) {
						const user = data[0];
						const colorResult = await api.get(`/colors/find.php`, {
							params: { idColor: user.favorite_color },
						});

						if (colorResult) {
							const colorData = colorResult.data;

							if (colorData.length > 0) {
								setEditing({
									...user,
									...colorData[0],
								});
								setFieldValue("name", user.name);
								setFieldValue("birthDate", user.birth_date);
								setFieldValue("preferedColor", colorData[0]);
							}
						}
					}
				}
			}
		};
		getEditing();
	}, [idFriend]);

	const [dbData, setDbData] = useState({
		colors: [],
		foods: [],
	});
	const [openModal, setOpenModal] = useState(false);
	const [openDialog, setOpenDialog] = useState(null);

	useEffect(() => {
		const getData = async () => {
			try {
				const result = await api.get(`colors/get.php`);
				setDbData({
					...dbData,
					colors: result.data,
				});
			} catch (err) {
				return null;
			}
		};

		getData();
	}, []);

	return (
		<Box p={2}>
			<Grid container>
				<Grid item xs={12}>
					<Paper elevation={0}>
						<Box p={2}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<UIText size="22px" textcolor="var(--primary)">
										Cadastro de amigo
									</UIText>
								</Grid>
								<Grid item xs={12}>
									<UIInput
										placeholder="Insira o nome"
										label="Nome:"
										{...GenerateFormikField("name", formikConfig)}
									/>
								</Grid>
								<Grid item xs={12}>
									<UIInput
										placeholder="Selecione a data"
										label="Data de nascimento:"
										{...GenerateFormikField(
											"birthDate",
											formikConfig
										)}
										type="date"
									/>
								</Grid>
								<Grid item xs={12}>
									<UIAutocomplete
										placeholder="Selecione a cor favorita"
										getOptionLabel={(option: any) =>
											option.name_color
										}
										label="Cor favorita:"
										{...GenerateFormikField(
											"preferedColor",
											formikConfig,
											"setFieldValue"
										)}
										items={dbData.colors || []}
										onChange={(value: any) => {
											formikConfig.setFieldValue(
												"preferedColor",
												value.target.value ?? {}
											);
										}}
										error={
											errors.preferedColor && touched.preferedColor
												? getOnlyOneError(errors, "preferedColor")
												: ""
										}
										renderOption={(option) => (
											<Grid
												container
												spacing={2}
												alignItems="center"
											>
												<Grid item xs={1}>
													<Box
														bgcolor={option.code}
														width="15px"
														height="15px"
														borderRadius="50px"
													/>
												</Grid>
												<Grid item>{option.name_color}</Grid>
											</Grid>
										)}
									/>
								</Grid>
								<Grid item xs={12}>
									<UIButton onClick={handleSubmit}>
										{editing ? "Editar" : "Cadastrar"}
									</UIButton>
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
