import React, { useEffect, useState } from "react";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { motion, AnimatePresence } from "framer-motion";
import TextField from '@mui/material/TextField';
import { useTranslation } from "react-i18next";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Switch from '@mui/material/Switch';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Textarea from '@mui/joy/Textarea';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import axios from "axios";


const valiSchema = Yup.object().shape({
    emailHeader: Yup.string().required("Required"),
    subject: Yup.string().max(50, 'Too Long!').required('Required'),
    content: Yup.string().required('Required'),
    toWho: Yup.string().required("Required")
});

const SendMailModal = ({ closeModal }: any) => {
    const {t} = useTranslation();
    const [toWho, setToWho] = React.useState('');
    const formik = useFormik({
        initialValues: { emailHeader: '', subject: '', content: '', toWho: ''},
        validationSchema: valiSchema,
        onSubmit: values => {
            //console.log(JSON.stringify(values, null, 2));
        },
    });
    const handleChange = (event: SelectChangeEvent) => {
        setToWho(event.target.value as string);
        formik.setFieldValue('toWho', event.target.value);
    };

    useEffect(()=>{
        axios.get("http://localhost:8000/zones")
         .then(function (response) {
            
         })
         .catch(function (error) {
             console.error('Error fetching data:', error);
         });
        
        
    },[]);
    
    const [open, setOpen] = useState(true);

    function close() {
        setOpen(false);
        setTimeout(() => { closeModal() }, 200);
    }
    return (
        <AnimatePresence mode="wait">
            {open ?
                <motion.form
                    className="form comm_form"
                    key={"modal98000000"}
                    onSubmit={formik.handleSubmit} // Ensure Formik's handleSubmit is bound here
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    >
                    <div className="form-header">
                        <h3>{t("Communication.modal.h1")}</h3>
                        <div onClick={close}><CloseRoundedIcon /></div>
                    </div>
                    <div className="email_content">
                        <div>
                            <label htmlFor="">{t("Communication.modal.mH")}</label>
                            <TextField variant="outlined"
                            onChange={formik.handleChange} value={formik.values.emailHeader} name="emailHeader"
                            error={formik.touched.emailHeader && Boolean(formik.errors.emailHeader)}
                            helperText={formik.touched.emailHeader && formik.errors.emailHeader}/>
                        </div>
                        <div>
                            <label htmlFor="">{t("Communication.modal.sbj")}</label>
                            <TextField variant="outlined"
                            onChange={formik.handleChange} value={formik.values.subject} name="subject"
                            error={formik.touched.subject && Boolean(formik.errors.subject)}
                            helperText={formik.touched.subject && formik.errors.subject}/>
                        </div>
                        <div className="txtArea">
                            <label htmlFor="">{t("Communication.modal.cnt")}</label>
                            <Textarea name="description" placeholder="Type here..." variant="outlined" minRows={4}
                            onChange={formik.handleChange} value={formik.values.content}
                            error={formik.touched.content && Boolean(formik.errors.content)}/>
                        </div>
                        <div>
                                <label htmlFor="">{t("Communication.modal.to")}</label>
                                <FormControl fullWidth>
                                    <Select
                                    id="demo-simple-select"
                                    value={toWho}
                                    onChange={handleChange}

                                    error={formik.touched.toWho && Boolean(formik.errors.toWho)}
                                    >
                                    <MenuItem value={"CLIENT@mail.ru"}>email1</MenuItem>
                                    <MenuItem value={"EMPLOYER@mail.ru"}>email2</MenuItem>
                                    </Select>
                                </FormControl>
                        </div>
                    </div>
                    <div className="btn-grp">
                        <Button variant="outlined" onClick={close}>{t("Communication.modal.sc")}</Button>
                        <Button variant="contained" type="submit" onClick={()=>console.log(JSON.stringify(formik.values, null, 2))}>{t("Communication.modal.save")}</Button> {/* Ensure type="submit" */}
                    </div>
                </motion.form>
                : null}
        </AnimatePresence>
    );
};

export default SendMailModal;
