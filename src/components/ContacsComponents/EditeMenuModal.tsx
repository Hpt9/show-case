import React, { useEffect, useState } from "react";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { motion, AnimatePresence } from "framer-motion";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import axios from "axios";
import { useTranslation } from "react-i18next";
import LOADING from "../ph/loadingAni.gif"
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const valiSchema = Yup.object().shape({
    ppImgBase64: Yup.string().required("Required"),
    fname: Yup.string().max(50, 'Too Long!').required('Required'),
    lname: Yup.string().required('Required'),
    peopleGroup: Yup.string().required("Required"),
    email: Yup.string().required('Required'),
    phoneNumber: Yup.string().required('Required'),
    address: Yup.string().max(50, 'Too Long!').required('Required'),
    city: Yup.string().required('Required'),
    country: Yup.string().required('Required'),
    isArchived: Yup.boolean().required('required')
});
const EditeMenuModal = ({ closeModal,id,reloadActive }: any) => {
    const [imgs, setImgs] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");
    const [data, setData] = useState<any>();
    const [isLoading, setIsLoading] = useState(true);
    const {t} = useTranslation();
    useEffect(() => {
        axios
          .get(`https://my-final-project-45l9.onrender.com/api/contact/${id}`)
          .then(function (response) {
            console.log(response.data)
            setData(response.data);
            if(response.status===200){setIsLoading(false);}
          })
          .catch(function (error) {console.log(error)})
      }, []);

      useEffect(() => {
        if (data) {
            setImgs(data.image.base64)
            formik.setValues({
                ppImgBase64: data.image.base64,
                fname: data.firstName,
                lname: data.lastName,
                peopleGroup: data.peopleGroup,
                email: data.email,
                phoneNumber: "506564794",
                address: data.address,
                city: data.city,
                country: data.country,
                isArchived: false
            });
        }
    }, [data]);
    const formik = useFormik({
        initialValues: {ppImgBase64: "",fname: "",lname: "",peopleGroup: "",email: "",phoneNumber: "506564794",address: "",city: "",country: "", isArchived:false},
        validationSchema: valiSchema,
        onSubmit: values => {},
    });
    function sendData() {
        if (Object.values(formik.values).every(value => value !== "" && value !== null && value !== undefined)) {
            console.log("sending started");
            console.log(formik.values)
            const finalData = {
                firstName: formik.values.fname,
                lastName: formik.values.lname,
                email: formik.values.email,
                address: formik.values.address,
                city: formik.values.city,
                country: formik.values.country,
                peopleGroup: formik.values.peopleGroup,
                image: {base64: formik.values.ppImgBase64},
                isArchived:formik.values.isArchived
            };
            console.log(finalData);
            axios.put(`https://my-final-project-45l9.onrender.com/api/contact/${id}`, finalData)
                .then(function (res) {
                    console.log(res.data);
                    close()
                    setTimeout(()=>reloadActive(),500)
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {console.log("cart");}
    }
    const [open, setOpen] = useState(true);
    function close() {
        setOpen(false);
        setTimeout(() => { closeModal() }, 200);
    }
    const handleChangePpInp = (e:any) => {
        const data = new FileReader()
        data.addEventListener('load', () => {
            setImgs(data.result)
            formik.setFieldValue('ppImgBase64', data.result);
        })
        data.readAsDataURL(e.target.files[0])
    }
    const [group, setGroup] = React.useState('');
    const handleChange = (event: SelectChangeEvent) => {
        setGroup(event.target.value as string);
        formik.setFieldValue('peopleGroup', event.target.value);
    };
    if (isLoading) {return <div style={{width:"100%",display:"flex",justifyContent:"center"}}><img src={LOADING} alt="Loading" /></div>;}
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
                        <h3>{t("Contacts.modal1.h1e")}</h3>
                        <div onClick={close}><CloseRoundedIcon /></div>
                    </div>
                    <div className="pp_img">
                        <img src={imgs} alt="" />
                        <div>
                            <label htmlFor="pp_img_uploader">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none"><path d="M8.5 14V11H10.5L8 8L5.5 11H7.5V14H5V13.975C4.916 13.98 4.836 14 4.75 14C3.75544 14 2.80161 13.6049 2.09835 12.9017C1.39509 12.1984 1 11.2446 1 10.25C1 8.326 2.455 6.758 4.322 6.543C4.48569 5.68729 4.94244 4.91537 5.61371 4.36C6.28497 3.80463 7.12878 3.50053 8 3.5C8.87134 3.50049 9.71529 3.80455 10.3867 4.35991C11.0581 4.91527 11.5151 5.68721 11.679 6.543C13.546 6.758 14.999 8.326 14.999 10.25C14.999 11.2446 14.6039 12.1984 13.9006 12.9017C13.1974 13.6049 12.2436 14 11.249 14C11.165 14 11.084 13.98 10.999 13.975V14H8.5Z" fill="#2C60EA"/></svg>
                                <span>{t("Contacts.modal1.photo")}</span>
                            </label>
                            <p>{t("Contacts.modal1.file")}</p>
                            <input type="file" name="" id="pp_img_uploader" onChange={handleChangePpInp} />
                        </div>
                    </div>
                    <div className="fn_ln_pg">
                        <div>
                            <label htmlFor="">{t("Contacts.modal1.fn")}</label>
                            <TextField id="outlined-basic" variant="outlined"
                            onChange={formik.handleChange} value={formik.values.fname} name="fname"
                            error={formik.touched.fname && Boolean(formik.errors.fname)}
                            helperText={formik.touched.fname && formik.errors.fname} />
                        </div>
                        <div>
                            <label htmlFor="">{t("Contacts.modal1.ln")}</label>
                            <TextField id="outlined-basic" variant="outlined"
                            onChange={formik.handleChange} value={formik.values.lname} name="lname"
                            error={formik.touched.lname && Boolean(formik.errors.lname)}
                            helperText={formik.touched.lname && formik.errors.lname} />
                        </div>
                        <div>
                            <label htmlFor="">{t("Contacts.modal1.pGroup")}</label>
                            <FormControl fullWidth>
                                <Select
                                id="demo-simple-select"
                                value={group}
                                onChange={handleChange}
                                error={formik.touched.peopleGroup && Boolean(formik.errors.peopleGroup)}>
                                <MenuItem value={"CLIENT"}>{t("Contacts.modal1.client")}</MenuItem>
                                <MenuItem value={"EMPLOYER"}>{t("Contacts.modal1.emp")}</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className="email_phone">
                        <div>
                            <label htmlFor="">{t("Contacts.modal1.em")}</label>
                            <TextField id="outlined-basic" variant="outlined"
                            onChange={formik.handleChange} value={formik.values.email} name="email"
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email} />
                        </div>
                        <div>
                            <label htmlFor="">{t("Contacts.modal1.phone")}</label>
                            <TextField id="outlined-basic" variant="outlined"
                            onChange={formik.handleChange} value={formik.values.phoneNumber} name="phoneNumber"
                            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber} />
                        </div>
                    </div>
                    <div className="city_country">
                        <div>
                            <label htmlFor="">{t("Contacts.modal1.address")}</label>
                            <TextField id="outlined-basic" variant="outlined"
                            onChange={formik.handleChange} value={formik.values.address} name="address"
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address && formik.errors.address} />
                        </div>
                        <div>
                            <label htmlFor="">{t("Contacts.modal1.city")}</label>
                            <TextField id="outlined-basic" variant="outlined"
                            onChange={formik.handleChange} value={formik.values.city} name="city"
                            error={formik.touched.city && Boolean(formik.errors.city)}
                            helperText={formik.touched.city && formik.errors.city} />
                        </div>
                        <div>
                            <label htmlFor="">{t("Contacts.modal1.country")}</label>
                            <TextField id="outlined-basic" variant="outlined"
                            onChange={formik.handleChange} value={formik.values.country} name="country"
                            error={formik.touched.country && Boolean(formik.errors.country)}
                            helperText={formik.touched.country && formik.errors.country} />
                        </div>
                    </div>
                    <div style={
                        {
                            display:"flex",
                            alignItems:"center"
                        }
                    }>
                            <Checkbox {...label}
                                onChange={formik.handleChange} value={formik.values.isArchived} name="isArchived"
                            />
                            <label htmlFor="">{t("Contacts.modal1.arc")}</label>
                    </div>
                    <div className="btn-grp">
                        <Button variant="outlined" onClick={close}>{t("Contacts.modal1.b1")}</Button>
                        <Button variant="contained" type="submit" 
                        onClick={()=>sendData()}>{t("Contacts.modal1.b3")}</Button>
                    </div>
                </motion.form>: null}
        </AnimatePresence>
    );
};
export default EditeMenuModal;