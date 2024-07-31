import { useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
// import TextField from "@mui/material/TextField";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Switch from "@mui/material/Switch";
// import Select, { SelectChangeEvent } from "@mui/material/Select";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import Textarea from "@mui/joy/Textarea";

import {  useFormik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import axios from "axios";

//const label = { inputProps: { "aria-label": "Switch demo" } };

const valiSchema = Yup.object().shape({
  photo: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  activeCases: Yup.boolean().required("Required"),
  createdBy: Yup.string().required("Required")
});
const AddAreaModal = ({ closeModal }: any) => {
  //const {t} = useTranslation();
  // function sendData() {
  //   if (Object.values(formik.values).every((value) => value !== "" && value !== null && value !== undefined)) {
  //     console.log("sending started");
  //     const finalData = {
  //       // name: formik.values.caseName,
  //       // phoneNumber: formik.values.phone,
  //       // caseNumber: formik.values.caseNumber,
  //       // description: formik.values.description,
  //       // dueDate: formik.values.openedDate,
  //       // //office: formik.values.office,
  //       // office: "HEAD_OFFICE",
  //       // //practiceAreaId: '',
  //       // base64: "aaaaaaaa",
  //     };
  //     console.log(finalData);
  //     axios
  //       .post("https://my-final-project-45l9.onrender.com/api/case", finalData)
  //       .then(function (response) {
  //         console.log(response.data);
  //         close();
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //         // Handle error
  //       });
  //   } else {console.log("cart");}
  // }

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
      closeModal();
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
            <h3>Add Case</h3>
            <div onClick={close}>
              <CloseRoundedIcon />
            </div>
          </div>
          <div className="btn-grp">
            <Button variant="outlined" onClick={close}>Save & Close</Button>
            <Button variant="contained" type="submit" onClick={() => console.log(formik.values)}>Save Case</Button>
          </div>
        </motion.form>) : null}
    </AnimatePresence>
  );
};
export default AddAreaModal;
