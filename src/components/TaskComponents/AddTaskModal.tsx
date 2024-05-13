import React, { useState } from "react";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import InputAdornment from '@mui/material/InputAdornment';
import DeleteIcon from '@mui/icons-material/Delete';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Textarea from '@mui/joy/Textarea';
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useTranslation } from "react-i18next";

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const valiSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    dueDate: Yup.string().required('Required'),
    caseId: Yup.string().required("Required"),
    priority: Yup.string().required('Required'),
    checklist: Yup.number().required('Required'),
    description: Yup.string().min(10, 'Too Short!').max(50, 'Too Long!').required('Required'),
    reminderType: Yup.string().required('Required'),
    reminderDay: Yup.string().required('Required'),
    reminderTimes: Yup.number().required('Required')
});

const AddTaskModal = ({ closeModal }: any) => {
    const {t} = useTranslation();
    const formik = useFormik({
        initialValues: { name: '', dueDate: '', caseId: '', priority: '', checklist: '', description: '', reminderType: '', reminderDay: '', reminderTimes: '' },
        validationSchema: valiSchema,
        onSubmit: values => {
            //console.log(JSON.stringify(values, null, 2));
            console.log("salam11")
            const newValue = {
                ...values,
                reminder: {
                    timeType: formik.values.reminderDay,
                    timePeriod: parseInt(formik.values.reminderTimes)
                },
            };
            const newValuesObject = { ...newValue };
            delete newValuesObject.reminderType;
            delete newValuesObject.reminderDay;
            delete newValuesObject.reminderTimes;

            //dd-MM-yyyy
            newValuesObject.dueDate = `${(newValuesObject.dueDate.$D) < 10 && "0" + newValuesObject.dueDate.$D}-${(newValuesObject.dueDate.$M + 1) < 10 && "0" + (newValuesObject.dueDate.$M + 1)}-${newValuesObject.dueDate.$y}`
            // console.log(newValuesObject);
            // console.log(); 

            fetch('http://192.168.35.182:8080/api/tasks', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
                  //'Authorization': 'Bearer YourAccessToken', // Example of Authorization header with a token
              },
              body: JSON.stringify(newValuesObject),
          })
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then(data => {
              console.log('Response:', data);
          })
          .catch(error => {
              console.error('Error:', error);
          });
        },
    });

    const [value, setValue] = useState<Dayjs | null>(dayjs(''));
    const [caseId, setCaseId] = useState('');
    const [priority, setPriority] = useState('');
    const [reminderType, setReminderType] = useState('');
    const [isLinked, setIsLinked] = useState(false);
    const [open, setOpen] = useState(true);

    const handlePriority = (event: SelectChangeEvent) => {
        setPriority(event.target.value as string);
        formik.setFieldValue('priority', event.target.value);
    };

    const handleChange = (event: SelectChangeEvent) => {
        setCaseId(event.target.value as string);
        formik.setFieldValue('caseId', event.target.value);
    };

    const handleReminder = (event: SelectChangeEvent) => {
        setReminderType(event.target.value as string);
        formik.setFieldValue('reminderType', event.target.value);
    };

    function close() {
        setOpen(false);
        setTimeout(() => { closeModal() }, 200);
    }

    return (
        <AnimatePresence mode="wait">
            {open ?
                <motion.form
                    className="form" key={"modal"} onSubmit={formik.handleSubmit}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.2 }}>
                    <div className="form-header">
                        <h3>{t("Task.modal.h1")}</h3>
                        <div onClick={close}><CloseRoundedIcon /></div>
                    </div>
                    <div className="name-date">
                        <div>
                            <label htmlFor="name">{t("Task.modal.name")}</label>
                            <TextField variant="outlined" id="name" name="name"
                                onChange={formik.handleChange} value={formik.values.name}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name} />
                        </div>
                        <div>
                            <label htmlFor="">{t("Task.modal.date")}</label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker name="dueDate" value={value}
                                    onChange={(newValue) => {
                                        setValue(newValue)
                                        formik.setFieldValue('dueDate', newValue);
                                    }} />
                            </LocalizationProvider>
                        </div>
                    </div>
                    {/* <FormControlLabel control={<Checkbox defaultChecked />} onChange={() => setIsLinked(prev => !prev)} label="This task is not linked to a case or lead" /> */}
                    <div className="caseOrLead">
                        <label htmlFor="">{t("Task.modal.s1")}</label>
                        <Select id="caseId" value={caseId}
                            error={formik.touched.caseId && Boolean(formik.errors.caseId)}
                            onChange={handleChange} disabled={isLinked}>
                            <MenuItem value={"D1ASD"}>Case1</MenuItem>
                            <MenuItem value={"Case2"}>Case2</MenuItem>
                            <MenuItem value={"Case3"}>Case3</MenuItem>
                        </Select>
                    </div>
                    <div className="priority">
                        <div>
                            <label htmlFor="">{t("Task.modal.prio")}</label>
                            <Select id="priority" value={priority} onChange={handlePriority}
                                error={formik.touched.priority && Boolean(formik.errors.priority)} fullWidth>
                                <MenuItem value={"High"}>{t("Task.modal.high")}</MenuItem>
                                <MenuItem value={"Medium"}>{t("Task.modal.medium")}</MenuItem>
                                <MenuItem value={"Low"}>{t("Task.modal.low")}</MenuItem>
                            </Select>
                        </div>
                        <div>
                            <label htmlFor="">{t("Task.modal.check")}</label>
                            <TextField id="checklist" variant="outlined" onChange={formik.handleChange} value={formik.values.checklist}
                                InputProps={{ endAdornment: (<InputAdornment position="end"><DeleteIcon /></InputAdornment>) }}
                                error={formik.touched.checklist && Boolean(formik.errors.checklist)}
                                helperText={formik.touched.checklist && formik.errors.checklist}
                            />
                        </div>
                    </div>
                    <div className="desc">
                        <label htmlFor="">{t("Task.modal.desc")}</label>
                        <Textarea placeholder="Type anything…" id="description" name="description" maxRows={3} minRows={3}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            value={formik.values.description} />
                    </div>
                    <div className="reminder" style={{marginBottom:"32px"}}>
                        <label htmlFor="">{t("Task.modal.rem")}</label>
                        <div>
                            <Select id="reminderType" name="reminderType" value={reminderType} onChange={handleReminder}
                                error={formik.touched.reminderType && Boolean(formik.errors.reminderType)} fullWidth>
                                <MenuItem value={"alert"}>{t("Task.modal.t1")}</MenuItem>
                                <MenuItem value={"popup"}>{t("Task.modal.t2")}</MenuItem>
                                <MenuItem value={"email"}>{t("Task.modal.t3")}</MenuItem>
                            </Select>
                            <TextField placeholder="Days" id="reminderTimes" onChange={formik.handleChange} value={formik.values.reminderTimes}
                                error={formik.touched.reminderTimes && Boolean(formik.errors.reminderTimes)}
                                helperText={formik.touched.reminderTimes && formik.errors.reminderTimes} />
                            <TextField placeholder="How Many Times" id="reminderDay" onChange={formik.handleChange} value={formik.values.reminderDay}
                                error={formik.touched.reminderDay && Boolean(formik.errors.reminderDay)}
                                helperText={formik.touched.reminderDay && formik.errors.reminderDay} />
                        </div>
                    </div>
                    {/* <div className="estimatedTime">
                        <label htmlFor="">Enable Estimate Time</label>
                        <Switch {...label} />
                    </div> */}
                    <div className="btn-grp">
                        <Button variant="outlined" onClick={close}>{t("Task.modal.b1")}</Button>
                        <Button variant="contained" type="submit">{t("Task.modal.b2")}</Button>
                    </div>
                </motion.form>
                : null}
        </AnimatePresence>
    );
};

export default AddTaskModal;
