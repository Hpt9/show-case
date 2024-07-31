import React, { useState } from "react";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { motion, AnimatePresence } from "framer-motion";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Textarea from '@mui/joy/Textarea';
import {  useFormik } from 'formik';
import { useTranslation } from "react-i18next";
import * as Yup from 'yup';
import Button from '@mui/material/Button';

//const label = { inputProps: { 'aria-label': 'Switch demo' } };

const valiSchema = Yup.object().shape({
    caseName: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    practiceArea: Yup.string().required("Required"),
    caseNumber: Yup.string().required("Required"),
    office: Yup.string().required("Required"),
    openedDate: Yup.string().required("Required"),
    statuteOfLimitations: Yup.string().required("Required"),
    caseStage: Yup.string().required("Required"),
    description: Yup.string().required("Required")
});
const AddCaseModal = ({ closeModal }: any) => {
    const {t} = useTranslation();
    // function sendData() {
    //     if (Object.values(formik.values).every(value => value !== "" && value !== null && value !== undefined)) {
    //         console.log("sending started");
    //         const finalData = {
    //             name: formik.values.caseName,
    //             phoneNumber: formik.values.phone,
    //             caseNumber: formik.values.caseNumber,
    //             description: formik.values.description,
    //             dueDate: formik.values.openedDate,
    //             //office: formik.values.office,
    //             office: "HEAD_OFFICE",
    //             //practiceAreaId: '',
    //             base64: "aaaaaaaa"
    //         };
    //         console.log(finalData);
    //         axios.post('https://my-final-project-45l9.onrender.com/api/case', finalData)
    //             .then(function (response) {
    //                 console.log(response.data);
    //                 close()
    //             })
    //             .catch(function (error) {
    //                 console.log(error);
    //                 // Handle error
    //             });
    //     } else {
    //         console.log("cart");
    //     }
    // }

    const formik = useFormik({
        initialValues: { caseName: '',phone: '', practiceArea: '',caseNumber:'',office:'',openedDate:'',statuteOfLimitations:'',caseStage:'',description:''},
        validationSchema: valiSchema,
        onSubmit: () => {
            //console.log(JSON.stringify(values, null, 2));
        },
    });  
    const [open, setOpen] = useState(true);

    function close() {
        setOpen(false);
        setTimeout(() => { closeModal() }, 200);
    }
    const [practiceArea, setPracticeArea] = React.useState('');
    const [office, setOffice] = React.useState('');
    const [sOLimitations, setSOLimitations] = React.useState('');
    const [cStage, setCStage] = React.useState('');
    const [selectedDate, setSelectedDate] = useState(null);

    const handleChange = (event: SelectChangeEvent) => {
        setPracticeArea(event.target.value as string);
        formik.setFieldValue('practiceArea', event.target.value);
    };
    const handleChange2 = (event: SelectChangeEvent) => {
        setOffice(event.target.value as string);
        formik.setFieldValue('office', event.target.value);
    };
    const handleChange3 = (event: SelectChangeEvent) => {
        setSOLimitations(event.target.value as string);
        formik.setFieldValue('statuteOfLimitations', event.target.value);
    };
    const handleChange4 = (event: SelectChangeEvent) => {
        setCStage(event.target.value as string);
        formik.setFieldValue('caseStage', event.target.value);
    };
    

    const handleDateChange = (date:any) => {
        setSelectedDate(date);
        formik.setFieldValue('openedDate', date.$d);
    };
    return (
        <AnimatePresence mode="wait">
            {open ?
                <motion.form
                    className="form"
                    key={"modal98000000"}
                    onSubmit={formik.handleSubmit} // Ensure Formik's handleSubmit is bound here
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.2 }}>
                    <div className="form-header">
                        <h3>{t("Cases.modal.h1")}</h3>
                        <div onClick={close}><CloseRoundedIcon /></div>
                    </div>
                    <div className="caseName_phone">
                        <div>
                            <label htmlFor="">{t("Cases.modal.name")}</label>
                            <TextField id="outlined-basic" variant="outlined" 
                            onChange={formik.handleChange} value={formik.values.caseName} name="caseName"
                            error={formik.touched.caseName && Boolean(formik.errors.caseName)}
                            helperText={formik.touched.caseName && formik.errors.caseName} />

                        </div>
                        <div>
                            <label htmlFor="">{t("Cases.modal.phone")}</label>
                            <TextField id="outlined-basic" variant="outlined" 
                            onChange={formik.handleChange} value={formik.values.phone} name="phone"
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.touched.phone && formik.errors.phone}/>
                        </div>
                    </div>
                    <div className="pa_case_num">
                        <div>
                            <label htmlFor="">{t("Cases.modal.pArea")}</label>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={practiceArea}
                                onChange={handleChange}
                                error={formik.touched.practiceArea && Boolean(formik.errors.practiceArea)}
                            >
                                <MenuItem value={"10"}>Ten</MenuItem>
                                <MenuItem value={"20"}>Twenty</MenuItem>
                                <MenuItem value={"30"}>Thirty</MenuItem>
                            </Select>
                        </div>
                        <div>
                            <label htmlFor="">{t("Cases.modal.caseNum")}</label>
                            <TextField id="outlined-basic" variant="outlined" 
                            onChange={formik.handleChange} value={formik.values.caseNumber} name="caseNumber"
                            error={formik.touched.caseNumber && Boolean(formik.errors.caseNumber)}
                            helperText={formik.touched.caseNumber && formik.errors.caseNumber}/>
                        </div>
                    </div>
                    <div className="office_opDate">
                        <div>
                            <label htmlFor="">{t("Cases.modal.office")}</label>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={office}
                                onChange={handleChange2}
                                error={formik.touched.office && Boolean(formik.errors.office)}
                            >
                                <MenuItem value={"OPEN"}>Ten</MenuItem>
                                <MenuItem value={"20"}>Twenty</MenuItem>
                                <MenuItem value={"30"}>Thirty</MenuItem>
                            </Select>
                        </div>
                        <div>
                            <label htmlFor="">{t("Cases.modal.oDate")}</label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                value={selectedDate}
                                onChange={handleDateChange}/>
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div className="statute_stage">
                        <div>
                            <label htmlFor="" style={{whiteSpace:"nowrap"}}>{t("Cases.modal.sOfLimit")}</label>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={sOLimitations}
                                onChange={handleChange3}
                                error={formik.touched.statuteOfLimitations && Boolean(formik.errors.statuteOfLimitations)}
                            >
                                <MenuItem value={"10"}>Ten</MenuItem>
                                <MenuItem value={"20"}>Twenty</MenuItem>
                                <MenuItem value={"30"}>Thirty</MenuItem>
                            </Select>
                        </div>
                        <div>
                            <label htmlFor="">{t("Cases.modal.cStage")}</label>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={cStage}
                                onChange={handleChange4}
                                error={formik.touched.caseStage && Boolean(formik.errors.caseStage)}
                            >
                                <MenuItem value={"10"}>Ten</MenuItem>
                                <MenuItem value={"20"}>Twenty</MenuItem>
                                <MenuItem value={"30"}>Thirty</MenuItem>
                            </Select>
                        </div>
                    </div>
                    <div className="description">
                        <label htmlFor="">{t("Cases.modal.desc")}</label>
                        <Textarea name="description" placeholder="Type here..." variant="outlined" minRows={4}
                        onChange={formik.handleChange} value={formik.values.description}
                        error={formik.touched.description && Boolean(formik.errors.description)}/>
                    </div>
                    <div className="btn-grp">
                        <Button variant="outlined" onClick={close}>{t("Cases.modal.sc")}</Button>
                        <Button variant="contained" type="submit" onClick={()=>console.log(formik.values)}>{t("Cases.modal.save")}</Button> {/* Ensure type="submit" */}
                    </div>
                </motion.form>
                : null}
        </AnimatePresence>
    );
};
export default AddCaseModal;
