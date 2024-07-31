import { useState } from "react";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { motion, AnimatePresence } from "framer-motion";
import TextField from '@mui/material/TextField';
import { useTranslation } from "react-i18next";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';

const valiSchema = Yup.object().shape({
    roleName: Yup.string().required("Required")
});

const AddRoleModal = ({ closeModal }: any) => {
    const {t} = useTranslation();
    const formik = useFormik({
        initialValues: { roleName: ''},
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
    //{t("Contacts.modal1.pGroup")}
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
                        <h3>{t("Contacts.modal2.h1")}</h3>
                        <div onClick={close}><CloseRoundedIcon /></div>
                    </div>
                    <div className="role_adder">
                            <label htmlFor="">{t("Contacts.modal2.h2")}</label>
                            <TextField id="outlined-basic" variant="outlined"
                            onChange={formik.handleChange} value={formik.values.roleName} name="roleName"
                            error={formik.touched.roleName && Boolean(formik.errors.roleName)}
                            helperText={formik.touched.roleName && formik.errors.roleName} />
                    </div>
                    <div className="btn-grp">
                        <Button variant="outlined" onClick={close}>{t("Contacts.modal2.b1")}</Button>
                        <Button variant="contained" type="submit" onClick={()=>console.log(JSON.stringify(formik.values, null, 2))}>{t("Contacts.modal2.b2")}</Button> {/* Ensure type="submit" */}
                    </div>
                </motion.form>
                : null}
        </AnimatePresence>
    );
};
export default AddRoleModal;
