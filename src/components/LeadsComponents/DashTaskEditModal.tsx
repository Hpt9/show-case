import { useEffect, useState } from "react";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { motion, AnimatePresence } from "framer-motion";
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import axios from "axios";
import { useTranslation } from "react-i18next";
import LOADING from "../ph/loadingAni.gif"

const valiSchema = Yup.object().shape({
    name: Yup.string().max(50, 'Too Long!').required('Required'),
    phone: Yup.string().required('Required'),
    status: Yup.string().required("Required")
});
const DashTaskEditModal = ({ closeModal,id,reloadActive }: any) => {
    const [data, setData] = useState<any>(id);
    const [isLoading, setIsLoading] = useState(true);
    const {t} = useTranslation();
    useEffect(() => {
        axios
          .get(`https://run.mocky.io/v3/43b81524-384d-4ae1-8e95-5a7955142f86`)
          .then(function (response) {
            console.log(response.data.Leads,data)
            setData(response.data.Leads);
            if(response.status===200){setIsLoading(false);}
          })
          .catch(function (error) {console.log(error)})
      }, []);
    const formik = useFormik({
        initialValues: {name: "",phone: "",status: ""},
        validationSchema: valiSchema,
        onSubmit: () => {},
    });
    function sendData() {
      console.log("Edited Data is Sent")
      console.log(formik.values)
      setTimeout(()=>{close()},200)
    }
    const [open, setOpen] = useState(true);
    function close() {
        setOpen(false);
          closeModal() 
        setTimeout(()=>reloadActive(),500)
    }
    if (isLoading) {return <div style={{width:"100%",display:"flex",justifyContent:"center"}}><img src={LOADING} alt="Loading" /></div>;}
    return (
        <AnimatePresence mode="wait">
            {open ?
                <motion.form
                    className="form fomr_contact"
                    style={{height:"fit-content",width:"400px !important"}}
                    key={"modal98000000"}
                    onSubmit={formik.handleSubmit} // Ensure Formik's handleSubmit is bound here
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.2 }}>
                    <div className="form-header">
                        <h3>Edit Task</h3>
                        <div onClick={close}><CloseRoundedIcon /></div>
                        
                    </div>
                    <div className="lbl-inp">
                            <label htmlFor="">Name</label>
                            <TextField id="outlined-basic" variant="outlined"
                            onChange={formik.handleChange} value={formik.values.name} name="name"
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name} />
                    </div>
                    <div className="lbl-inp">
                            <label htmlFor="">Task Name</label>
                            <TextField id="outlined-basic" variant="outlined"
                            onChange={formik.handleChange} value={formik.values.phone} name="phone"
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.touched.phone && formik.errors.phone} />
                      </div>
                        <div className="lbl-inp">
                            <label htmlFor="">Due Date</label>
                            <TextField id="outlined-basic" variant="outlined"
                            onChange={formik.handleChange} value={formik.values.status} name="status"
                            error={formik.touched.status && Boolean(formik.errors.status)}
                            helperText={formik.touched.status && formik.errors.status} />
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
export default DashTaskEditModal;