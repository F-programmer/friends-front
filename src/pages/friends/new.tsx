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

import UIInput from "components/UI/Input";
import UIButton from "components/UI/Button/index";
import UIText from "components/UI/Text/index";
import UIAutocomplete from "components/UI/Autocomplete/index";

import api from "api/index";

import { useFormik } from "formik";
import { GenerateFormikField } from "utils/pages";
import * as yup from "yup";

import { FaUserAlt } from "react-icons/fa";

const validationSchema = yup.object().shape({
	name: yup.string().required("Insira o nome"),
	birthDate: yup.string().required("Selecione uma data"),
	preferedColor: yup.mixed().required("Selecione uma opção"),
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
	const [dbData, setDbData] = useState({
		colors: [],
		foods: [],
	});
	const [openModal, setOpenModal] = useState(false);
	const [openDialog, setOpenDialog] = useState(null);

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
				const result = await api.post(`friends/post.php`, data);
				console.log(result);
				if (Boolean(result.data)) {
					setOpenDialog("Usuário cadastrado com sucesso!!");
					resetForm();
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
									<UIButton onClick={handleSubmit}>Cadastrar</UIButton>
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
					<DialogTitle id="simple-dialog-title">
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
