import React, { useContext, useState } from "react";
import gql from "graphql-tag";
import { useMutation } from 'react-apollo-hooks';
import * as Yup from "yup";

import Context from "context/context";
import Form from "components/Form/Form";

import styles from './login.module.scss';

const login_mutation = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const Login = props => {
  
  const context = useContext(Context);

  const [errorMessage, setErrorMessage] = useState(null);
  const [loginMutation] = useMutation(login_mutation);
  
  const redirect = (to, prop) => {
    let { location } = prop
    let path = to

    if(location && location.state && typeof(location.state.from) !== undefined) {
      path = location.state.from
    }
    prop.history.push(path)
  }
  
  const fields = [
    {
      label: "Email",
      type: "text",
      name: "email",
      initialValue: "",
      placeholder: "your@email.com",
      autofocus: true,
      validation: Yup.string()
        .label("Email")
        .email("Not a valid Email")
        .required("email is required")
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      initialValue: "",
      placeholder: "your password",
      validation: Yup.string()
        .label("Password")
        .min(3, "Minimum 3 char")
        .max(18, "maximum 18 char")
        .required("password is required")
    }
  ];

  return (
    <div className={styles.container}>
      {errorMessage && <div className="error">{ errorMessage }</div>}

      <Form
        title={"Log ind"}
        handleSubmit={loginMutation}
        submitButton={"Log ind"}
        onError={setErrorMessage}
        fields={fields}
        class={"form"}
        redirect={() => redirect("/", props)}
        onSuccess={result => {
          context.setToken(result.data.login.token);
          context.setUser(result.data.login.token);
        }}
        {...props}
      />
    </div>
  );
};
export default Login;
