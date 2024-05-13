import { useState } from "react";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { motion, AnimatePresence } from "framer-motion";
import TextField from '@mui/material/TextField';
import { useTranslation } from "react-i18next";
import Textarea from '@mui/joy/Textarea';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import axios from "axios";
const valiSchema = Yup.object().shape({
    companyName: Yup.string().required("Required"),
    email: Yup.string().required('Required'),
    website: Yup.string().required('Required'),
    phoneNumber: Yup.string().required("Required"),
    faxNumber: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    ppImgBase64: Yup.string().required('Required'),
    caseId: Yup.string().required('Required')
});
const AddCompanyModal = ({ closeModal }: any) => {
    const {t} = useTranslation();
    const formik = useFormik({
        initialValues: { companyName: '', email: '', website: '', phoneNumber: '', faxNumber: '', address: '',city: '', description: '',ppImgBase64: 'aaaaaaa',caseId: '1'},
        validationSchema: valiSchema,
        onSubmit: values => {
            //console.log(JSON.stringify(values, null, 2));
        },
    });
    const [open, setOpen] = useState(true);

    function sendData() {
        if (Object.values(formik.values).every(value => value !== "" && value !== null && value !== undefined)) {
            console.log("sending started");
            const finalData = {
                name: formik.values.companyName,
                email: formik.values.email,
                website: formik.values.website,
                phoneNumber: formik.values.phoneNumber,
                faxNumber: formik.values.faxNumber,
                city: formik.values.city,
                address:formik.values.address,
                description:formik.values.description,
                image: {
                    base64: "sssssssss"
                },
                caseId:"1"       
            };
            console.log(finalData);
            axios.post('https://my-final-project-45l9.onrender.com/api/company', finalData)
                .then(function (response) {
                    console.log(response.data);
                    close()
                })
                .catch(function (error) {
                    console.log(error);
                    // Handle error
                });
        } else {
            console.log("cart");
        }
    }
    function close() {
        setOpen(false);
        setTimeout(() => { closeModal() }, 200);
    }
    return (
        <AnimatePresence mode="wait">
            {open ?
                <motion.form
                    className="form fomr_contact"
                    key={"modal98000000"}
                    onSubmit={formik.handleSubmit} // Ensure Formik's handleSubmit is bound here
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.2 }}>
                    <div className="form-header">
                        <h3>{t("Contacts.modal3.h1")}</h3>
                        <div onClick={close}><CloseRoundedIcon /></div>
                    </div>
                   
                    <div className="cname_email">
                        <div>
                            <label htmlFor="">{t("Contacts.modal3.cn")}</label>
                            <TextField id="outlined-basic" variant="outlined"
                            onChange={formik.handleChange} value={formik.values.companyName} name="companyName"
                            error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                            helperText={formik.touched.companyName && formik.errors.companyName} />
                        </div>
                        <div>
                            <label htmlFor="">{t("Contacts.modal3.em")}</label>
                            <TextField id="outlined-basic" variant="outlined"
                            onChange={formik.handleChange} value={formik.values.email} name="email"
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email} />
                        </div>
                    </div>
                    <div className="website">
                        <label htmlFor="">{t("Contacts.modal3.web")}</label>
                        <TextField id="outlined-basic" variant="outlined"
                            onChange={formik.handleChange} value={formik.values.website} name="website"
                            error={formik.touched.website && Boolean(formik.errors.website)}
                            helperText={formik.touched.website && formik.errors.website} />
                    </div>
                    <div className="pn_fn">
                        <div>
                            <label htmlFor="">{t("Contacts.modal3.phone")}</label>
                            <TextField id="outlined-basic" variant="outlined"
                            onChange={formik.handleChange} value={formik.values.phoneNumber} name="phoneNumber"
                            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber} />
                        </div>
                        <div>
                            <label htmlFor="">{t("Contacts.modal3.fxN")}</label>
                            <TextField id="outlined-basic" variant="outlined"
                            onChange={formik.handleChange} value={formik.values.faxNumber} name="faxNumber"
                            error={formik.touched.faxNumber && Boolean(formik.errors.faxNumber)}
                            helperText={formik.touched.faxNumber && formik.errors.faxNumber} />
                        </div>
                    </div>
                    <div className="address">
                        <label htmlFor="">{t("Contacts.modal3.address")}</label>
                        <TextField id="outlined-basic" variant="outlined"
                            onChange={formik.handleChange} value={formik.values.address} name="address"
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address && formik.errors.address} />
                    </div>
                    <div className="city">
                        <label htmlFor="">{t("Contacts.modal3.city")}</label>
                        <TextField id="outlined-basic" variant="outlined"
                            onChange={formik.handleChange} value={formik.values.city} name="city"
                            error={formik.touched.city && Boolean(formik.errors.city)}
                            helperText={formik.touched.city && formik.errors.city} />
                    </div>
                    <div className="description">
                        <label htmlFor="">{t("Contacts.modal3.desc")}</label>
                        <Textarea placeholder="Type anything…" id="description" name="description" maxRows={3} minRows={3}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            value={formik.values.description} />
                    </div>



                    <div className="btn-grp">
                        <Button variant="outlined" onClick={close}>{t("Contacts.modal3.b1")}</Button>
                        <Button variant="contained" type="submit" onClick={()=>{
                            sendData()
                            console.log(formik.values)
                        }}>{t("Contacts.modal3.b2")}</Button>
                    </div>
                </motion.form>
                : null}
        </AnimatePresence>
    );
};

export default AddCompanyModal;
