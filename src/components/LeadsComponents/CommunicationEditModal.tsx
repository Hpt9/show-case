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
    contact: Yup.string().max(50, 'Too Long!').required('Required'),
    type: Yup.string().required('Required'),
    message: Yup.string().required("Required")
});
const CommunicationEditModal = ({ closeModal,id,reloadActive }: any) => {
    const [data, setData] = useState<any>(id);
    const [isLoading, setIsLoading] = useState(true);
    const {t} = useTranslation();
    useEffect(() => {
        axios
          .get(`https://hpt9.github.io/show-case-db/db.json`)
          .then(function (response) {
            console.log(response.data.Leads,data)
            setData(response.data.Leads);
            if(response.status===200){setIsLoading(false);}
          })
          .catch(function (error) {console.log(error)})
      }, []);
    const formik = useFormik({
        initialValues: {contact: "",type: "",message: ""},
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
                    key={"modal980000000"}
                    onSubmit={formik.handleSubmit} // Ensure Formik's handleSubmit is bound here
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.2 }}>
                    <div className="form-header">
                        <h3>Edit Communication</h3>
                        <div onClick={close}><CloseRoundedIcon /></div>
                        
                    </div>
                    <div className="lbl-inp">
                            <label htmlFor="">Contact</label>
                            <TextField id="outlined-basic" variant="outlined"
                            onChange={formik.handleChange} value={formik.values.contact} name="contact"
                            error={formik.touched.contact && Boolean(formik.errors.contact)}
                            helperText={formik.touched.contact && formik.errors.contact} />
                    </div>
                    <div className="lbl-inp">
                            <label htmlFor="">Type</label>
                            <TextField id="outlined-basic" variant="outlined"
                            onChange={formik.handleChange} value={formik.values.type} name="type"
                            error={formik.touched.type && Boolean(formik.errors.type)}
                            helperText={formik.touched.type && formik.errors.type} />
                      </div>
                        <div className="lbl-inp">
                            <label htmlFor="">Message</label>
                            <TextField id="outlined-basic" variant="outlined"
                            onChange={formik.handleChange} value={formik.values.message} name="message"
                            error={formik.touched.message && Boolean(formik.errors.message)}
                            helperText={formik.touched.message && formik.errors.message} />
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
export default CommunicationEditModal;