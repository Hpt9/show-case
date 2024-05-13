import { useNavigate,useLocation } from "react-router-dom";
import "../scss/LoginPage.scss";
import Checkbox from "@mui/material/Checkbox";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as Yup from "yup";
import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import { isLoggedContext, IsLoggedContextProps } from "../App";
import axios from "axios";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const MAXIMUM_PASSWORD_LENGTH = 30;
const MINIMUM_PASSWORD_LENGTH = 8;
interface ILoginValues {
  email: string;
  password: string;
}

const loginValidationSchema = () => {
  return Yup.object({
    email: Yup.string().email("Invalid email address").required("This field is required"),
    password: Yup.string().required("This field is required")
      .max(MAXIMUM_PASSWORD_LENGTH,`Maximum password length is ${MAXIMUM_PASSWORD_LENGTH} characters`)
      .min(MINIMUM_PASSWORD_LENGTH,`Minimum password length is ${MINIMUM_PASSWORD_LENGTH} characters`)
  });
};
export default function LoginPage() {
  const location = useLocation()
  const { isLogged,showMenu,setShowMenu, setIsLogged } = useContext<IsLoggedContextProps>(isLoggedContext);
    useEffect(()=>{
      console.log('handle route change here', location)
      location.pathname==="/login"?setShowMenu(false):setShowMenu(true)
      console.log(showMenu)
    },[location])

  const navigate = useNavigate();
  const loginFormikForm:any = useFormik({
    initialValues: {
      email: "",
      password: ""
    } as ILoginValues,
    validationSchema: loginValidationSchema,
    onSubmit: () => handleSubmitForm(loginFormikForm.values)
  });
  const handleSubmitForm = (loginFormikForm:object) => {
    //submitde backa gedesi melumatlar
    console.log(loginFormikForm)
    axios.post('http://192.168.99.159:8080/api/v1/auth/login', loginFormikForm)
      .then(function (response) {
        console.log(response);
        navigate('/')
        setIsLogged(true)
      setShowMenu(true)
      })
      .catch(function (error) {
        console.log(error);
        // Handle error
      });
    //navigate('/')
    
    
  };
  return (
    <div className="main-div">
      <form className="login-form" onSubmit={loginFormikForm.handleSubmit}>
        <h2>Sign In</h2>
        <TextField
            id="email"
            name="email"
            label="Email"
            type="email"
            value={loginFormikForm.values.email}
            onChange={loginFormikForm.handleChange}
            error={
              loginFormikForm.touched.email &&
              Boolean(loginFormikForm.errors.email)
            }
            helperText={
              loginFormikForm.touched.email&& loginFormikForm.errors.email
            }
            margin="dense"
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            sx={{marginBottom:"10px"}}
            value={loginFormikForm.values.password}
            onChange={loginFormikForm.handleChange}
            error={
              loginFormikForm.touched.password &&
              Boolean(loginFormikForm.errors.password)
            }
            helperText={
              loginFormikForm.touched.password && loginFormikForm.errors.password
            }
            margin="dense"
          />
        
        <Button variant="contained" type="submit">Sign In</Button>
        <button onClick={() => navigate('/register')} className="reg-btn">Don't have an Account? Register.</button>
      </form>
    </div>
  );
}