import React, { useEffect, useState } from "react";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { motion, AnimatePresence } from "framer-motion";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import { useTranslation } from "react-i18next";

const valiSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    refferalSource: Yup.string().required("Required"),
    refferedBy: Yup.string().required("Required"),
    leadDetails: Yup.string().required("Required"),
    caseDesc: Yup.string().required("Required"),
    lStatus: Yup.string().required("Required"),
    prArea: Yup.string().required("Required"),
    price: Yup.string().required("Required"),
    leadAddDate: Yup.string().required("Required")
});

const AddLeadModal = ({ closeModal }: any) => {
    const {t} = useTranslation();
    const [refComp, setRefComp] = React.useState('');
    const [prArea, setPrArea] = React.useState('');
    const [leadStatus, setLeadStatus] = React.useState('');
    const [dateAdded, setDateAdded] = React.useState(null);
    const handleChange = (event: SelectChangeEvent) => {
        setRefComp(event.target.value as string);
        formik.setFieldValue('refferedBy', event.target.value);
    };
    const handleChange2 = (event: SelectChangeEvent) => {
        setLeadStatus(event.target.value as string);
        formik.setFieldValue('lStatus', event.target.value);
    };
    const handleDateChange = (date:any) => {
        setDateAdded(date);
        formik.setFieldValue('leadAddDate', date.$d);
    };
    const handleChange3 = (event: SelectChangeEvent) => {
        setPrArea(event.target.value as string);
        formik.setFieldValue('prArea', event.target.value);
    };

    const formik = useFormik({
        initialValues: { firstName: '',lastName: '',email: '',phone: '',refferalSource: '',refferedBy:'',leadDetails: '',caseDesc: '',lStatus: '',prArea: '',price: ''},
        validationSchema: valiSchema,
        onSubmit: values => {
            //console.log(JSON.stringify(values, null, 2));
        },
    });  
    const [open, setOpen] = useState(true);

    function close() {
        setOpen(false);
        setTimeout(() => { closeModal() }, 200);
    }
    return (
        <AnimatePresence mode="wait">
            {open ?
                <motion.form
                    className="form"
                    key={"modal98000000"}
                    onSubmit={formik.handleSubmit}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.2 }}>
                    <div className="form-header">
                        <h3>{t("Leads.modal.h1")}</h3>
                        <div onClick={close}><CloseRoundedIcon /></div>
                    </div>
                    <div className="modal_div">
                        <div>
                            <h1>{t("Leads.modal.h2")}</h1>
                            <div className="fl_name">
                                <div>
                                    <label htmlFor="">{t("Leads.modal.fn")}</label>
                                    <TextField variant="outlined"
                                    onChange={formik.handleChange} value={formik.values.firstName} name="firstName"
                                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                    helperText={formik.touched.firstName && formik.errors.firstName}/>
                                </div>
                                <div>
                                    <label htmlFor="">{t("Leads.modal.ln")}</label>
                                    <TextField variant="outlined"
                                    onChange={formik.handleChange} value={formik.values.lastName} name="lastName"
                                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                    helperText={formik.touched.lastName && formik.errors.lastName}/>
                                </div>
                            </div>
                            <div className="em">
                                <label htmlFor="">{t("Leads.modal.em")}</label>
                                <TextField variant="outlined"
                                onChange={formik.handleChange} value={formik.values.email} name="email"
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}/>
                            </div>
                            <div className="pho_refsrc">
                                <div>
                                    <label htmlFor="">{t("Leads.modal.ph")}</label>
                                    <TextField variant="outlined"
                                    onChange={formik.handleChange} value={formik.values.phone} name="phone"
                                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                                    helperText={formik.touched.phone && formik.errors.phone}/>
                                </div>
                                <div>
                                    <label htmlFor="">{t("Leads.modal.rs")}</label>
                                    <TextField variant="outlined"
                                     onChange={formik.handleChange} value={formik.values.refferalSource} name="refferalSource"
                                     error={formik.touched.refferalSource && Boolean(formik.errors.refferalSource)}
                                     helperText={formik.touched.refferalSource && formik.errors.refferalSource}
                                    />
                                </div>
                            </div>
                            <div className="refBy">
                                <label htmlFor="">{t("Leads.modal.refBy")}</label>
                                <FormControl fullWidth>
                                    <Select
                                    id="demo-simple-select"
                                    value={refComp}
                                    onChange={handleChange}

                                    error={formik.touched.refferalSource && Boolean(formik.errors.refferalSource)}
                                    >
                                    <MenuItem value={"CLIENT"}>Client</MenuItem>
                                    <MenuItem value={"EMPLOYER"}>Employer</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="lDetails">
                                <label htmlFor="">{t("Leads.modal.lD")}</label>
                                <Textarea minRows={4}
                                onChange={formik.handleChange} value={formik.values.leadDetails} name="leadDetails"
                                error={formik.touched.leadDetails && Boolean(formik.errors.leadDetails)}/>
                            </div>
                        </div>
                        <div>
                            <h1>{t("Leads.modal.h3")}</h1>
                            <div className="lAddDate">
                                <label htmlFor="">{t("Leads.modal.date")}</label>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                    value={dateAdded}
                                    onChange={handleDateChange}/>
                                </LocalizationProvider>
                            </div>
                            <div className="sta">
                                <label htmlFor="">Status</label>
                                <FormControl fullWidth>
                                    <Select
                                    id="demo-simple-select"
                                    value={leadStatus}
                                    onChange={handleChange2}

                                    error={formik.touched.lStatus && Boolean(formik.errors.lStatus)}
                                    >
                                    <MenuItem value={"HIGH"}>{t("Leads.modal.high")}</MenuItem>
                                    <MenuItem value={"MEDIUM"}>{t("Leads.modal.medium")}</MenuItem>
                                    <MenuItem value={"LOW"}>{t("Leads.modal.low")}</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="prArea">
                                <label htmlFor="">{t("Leads.modal.pArea")}</label>
                                <FormControl fullWidth>
                                    <Select
                                    id="demo-simple-select"
                                    value={prArea}
                                    onChange={handleChange3}

                                    error={formik.touched.prArea && Boolean(formik.errors.prArea)}
                                    >
                                    <MenuItem value={"CLIENT"}>Client</MenuItem>
                                    <MenuItem value={"EMPLOYER"}>Employer</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="prc">
                                <label htmlFor="">{t("Leads.modal.vOfCase")}</label>
                                <TextField variant="outlined"
                                onChange={formik.handleChange} value={formik.values.price} name="price"
                                error={formik.touched.price && Boolean(formik.errors.price)}
                                helperText={formik.touched.price && formik.errors.price}/>
                            </div>
                            <div className="caseDesc">
                                <label htmlFor="">{t("Leads.modal.desc")}</label>
                                <Textarea minRows={4}
                                onChange={formik.handleChange} value={formik.values.caseDesc} name="caseDesc"
                                error={formik.touched.caseDesc && Boolean(formik.errors.caseDesc)}/>
                            </div>
                        </div>
                    </div>
                    <div className="btn-grp">
                        <Button variant="outlined" onClick={close}>{t("Leads.modal.b1")}</Button>
                        <Button variant="contained" type="submit" onClick={()=>console.log(JSON.stringify(formik.values, null, 2))}>{t("Leads.modal.b2")}</Button> {/* Ensure type="submit" */}
                    </div>
                </motion.form>
                : null}
        </AnimatePresence>
    );
};
export default AddLeadModal;
