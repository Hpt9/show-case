import { useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import axios from "axios";

const valiSchema = Yup.object().shape({
  photo: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  activeCases: Yup.boolean().required("Required"),
  createdBy: Yup.string().required("Required")
});
const EditPracticeArea = ({ closeModal2,id,reloadActive }: any) => {
  const {t} = useTranslation();
  function sendData() {
    if (Object.values(formik.values).every((value) => value !== "" && value !== null && value !== undefined)) {
      console.log("sending started");
      const finalData = {
        // name: formik.values.caseName,
      };
      console.log(finalData);
      axios
        .post("https://my-final-project-45l9.onrender.com/api/case", finalData)
        .then(function (response) {
          console.log(response.data);
          close();
        })
        .catch(function (error) {
          console.log(error);
          // Handle error
        });
    } else {console.log(id);}
  }

  const formik = useFormik({
    initialValues: {photo: "",name: "",city: "",activeCases: "",createdBy: ""},
    validationSchema: valiSchema,
    onSubmit: () => {
      //console.log(JSON.stringify(values, null, 2));
    },
  });
  const [open, setOpen] = useState(true);

  function close() {
    setOpen(false);
    setTimeout(() => {
      closeModal2();
    }, 200);
  }
  return (
    <AnimatePresence mode="wait">
      {open ? (
        <motion.form
          className="form"
          key={"modal98000000"}
          onSubmit={formik.handleSubmit} // Ensure Formik's handleSubmit is bound here
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="form-header">
            <h3>{t(`Cases.editArea`)}</h3>
            <div onClick={close}>
              <CloseRoundedIcon />
            </div>
          </div>
          <div className="btn-grp">
            <Button variant="outlined" onClick={close}>{t(`Cases.b1`)}</Button>
            <Button variant="contained" type="submit" onClick={() => {
                console.log(formik.values)
                sendData()
                close()
                setTimeout(()=>reloadActive(),500)
                }}>{t(`Cases.b2`)}</Button>
          </div>
        </motion.form>) : null}
    </AnimatePresence>
  );
};
export default EditPracticeArea;
