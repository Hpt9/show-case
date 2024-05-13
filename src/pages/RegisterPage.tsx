import "../scss/RegisterPage.scss"
import { useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MuiTelInput } from 'mui-tel-input'
import axios, {Axios} from "axios"
const MAXIMUM_PASSWORD_LENGTH = 30;
const MINIMUM_PASSWORD_LENGTH = 8;
interface ILoginValues {firstName: string;lastName: string;email: string;password: string;username:string}
// interface ILoginValues {firstName: string;lastName: string;email: string;phoneNum: string;password: string;confirmPassword: string;username:string}
const loginValidationSchema = () => {
  return Yup.object({
    firstName: Yup.string().required("This field is required"),
    lastName: Yup.string().required("This field is required"),
    email: Yup.string().email("Invalid email address").required("This field is required"),
    password: Yup.string().required("This field is required")
      .max(MAXIMUM_PASSWORD_LENGTH,`Maximum password length is ${MAXIMUM_PASSWORD_LENGTH} characters`)
      .min(MINIMUM_PASSWORD_LENGTH,`Minimum password length is ${MINIMUM_PASSWORD_LENGTH} characters`),
    //confirmPassword: Yup.string().required("This field is required").oneOf([Yup.ref('password')], 'Passwords must match')
  });
};
export default function RegisterPage() {
  const [value, setValue] = useState('')
  const handleChange = (newValue:string) => {
    setValue(newValue)
    //RegFormikForm.values.phoneNum=newValue
  }
  async function postData(obj:object) {
    //console.log(obj)
    axios.post('http://192.168.99.159:8080/api/v1/auth/register', obj)
      .then(function (response) {
        console.log(response.data);
        // Handle success response
      })
      .catch(function (error) {
        console.log(error);
        // Handle error
      });
  }
  const navigate = useNavigate();
  const RegFormikForm:any = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      username:"salam",
      phoneNumber:"0506564794",
      address:"Katex"
    } as ILoginValues,
    validationSchema: loginValidationSchema,
    onSubmit: () =>{
      handleSubmitForm(RegFormikForm.values)
      navigate("/login")
    } 
  });
  const handleSubmitForm = (RegFormikForm:object) => {
    const object:object = RegFormikForm;
    postData(object)
  };
  return (
    <div className="main-reg-div">
        <form className="register-form" onSubmit={RegFormikForm.handleSubmit}> 
          <h2>Sign Up</h2>
          <TextField
            id="firstName"
            name="firstName"
            label="First Name"
            type="firstName"
            value={RegFormikForm.values.firstName}
            onChange={RegFormikForm.handleChange}
            error={
              RegFormikForm.touched.firstName &&
              Boolean(RegFormikForm.errors.firstName)
            }
            helperText={RegFormikForm.touched.firstName&& RegFormikForm.errors.firstName}
            margin="dense"
          />
          <TextField
            id="lastName"
            name="lastName"
            label="Last Name"
            type="lastName"
            value={RegFormikForm.values.lastName}
            onChange={RegFormikForm.handleChange}
            error={
              RegFormikForm.touched.lastName &&
              Boolean(RegFormikForm.errors.lastName)
            }
            helperText={RegFormikForm.touched.lastName&& RegFormikForm.errors.lastName}
            margin="dense"
          />
          <TextField
            id="email"
            name="email"
            label="Email"
            type="email"
            value={RegFormikForm.values.email}
            onChange={RegFormikForm.handleChange}
            error={
              RegFormikForm.touched.email &&
              Boolean(RegFormikForm.errors.email)
            }
            helperText={RegFormikForm.touched.email&& RegFormikForm.errors.email}
            margin="dense"
          />
          {/* <MuiTelInput 
            value={value} 
            id="phoneNum"
            name="phoneNum"
            placeholder="Phone Number"
            onChange={handleChange}
          /> */}
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            value={RegFormikForm.values.password}
            onChange={RegFormikForm.handleChange}
            error={
              RegFormikForm.touched.password &&
              Boolean(RegFormikForm.errors.password)
            }
            helperText={RegFormikForm.touched.password && RegFormikForm.errors.password}
            margin="dense"
          />
          {/* <TextField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={RegFormikForm.values.confirmPassword}
            onChange={RegFormikForm.handleChange}
            error={
              RegFormikForm.touched.confirmPassword &&
              Boolean(RegFormikForm.errors.confirmPassword)
            }
            helperText={RegFormikForm.touched.confirmPassword && RegFormikForm.errors.confirmPassword}
            margin="dense"
          /> */}
        <br />
        <Button variant="contained" type="submit">Sign Up</Button>
        </form>      
    </div>
  )
}