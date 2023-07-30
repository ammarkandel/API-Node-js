import { useState } from "react";
import { Alert, FormRow } from "../components";
import { useAppContext } from '../context/appContext';


const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}

const Register = () => {
  const [values, setValues] = useState(initialState);
  const { isLoading, showAlert, displayAlert } = useAppContext();
  
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;

    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    console.log(values);
  }

  const toggleMember = () => {
    setValues({...values, isMember: !values.isMember})
  }

  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <h1>{ values.isMember ? "Login" : "Register" }</h1>
        {showAlert && <Alert />}

        {
          !values.isMember && (
          <FormRow 
            type="text"
            name='name'
            value={values.name}
            handleChange={handleChange}
          />
          )
        }

        <FormRow 
          type="email"
          name='email'
          value={values.email}
          handleChange={handleChange}
        />

        <FormRow 
          type="password"
          name='password'
          value={values.password}
          handleChange={handleChange}
        />

        <button type='submit'>Submit</button>

        <p>
          <button type="button" onClick={toggleMember}>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </div>
  )
}

export default Register;
