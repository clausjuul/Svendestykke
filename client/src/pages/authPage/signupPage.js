import React, { useContext, useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "react-apollo-hooks";

import Context from "context/context";
import Form from "components/Form/Form";
import * as Yup from "yup";

import styles from "./signup.module.scss";

const signup_mutation = gql`
  mutation signup(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
    $phone: String!
    $terms: Boolean
  ) {
    signup(
      user: {
        firstname: $firstname
        lastname: $lastname
        email: $email
        password: $password
        confirmPassword: $confirmPassword
        phone: $phone
        terms: $terms
      }
    ) {
      token
    }
  }
`;


  let signupFields = [
    {
      label: "Fornavn",
      type: "input",
      name: "firstname",
      initialValue: "",
      autofocus: true,
      validation: Yup.string()
        .label("Fornavn")
        .min(2, "Minimum 2 bogstaver")
        .max(40, "Maximum 40 bogstaver")
        .required("Fornavn er påkrævet")
    },
    {
      label: "Efternavn",
      type: "input",
      name: "lastname",
      initialValue: "",
      validation: Yup.string()
        .label("Efternavn")
        .min(3, "Minimum 3 bogstaver")
        .max(40, "Maximum 40 bogstaver")
        .required("Efternavn er påkrævet")
    },
    {
      label: "E-mail / brugernavn:",
      type: "input",
      name: "email",
      initialValue: "",
      validation: Yup.string()
        .label("E-mail")
        .email("Not a valid Email")
        .required("E-mail er påkrævet")
    },
    {
      label: "Adgangskode:",
      type: "password",
      name: "password",
      initialValue: "",
      validation: Yup.string()
        .label("Adgangskode")
        .min(3, "Minimum 3 bogstaver og/eller tal")
        .required("Adgangskode er påkrævet")
    },
    {
      label: "Gentag adgangskode:",
      type: "password",
      name: "confirmPassword",
      initialValue: "",
      validation: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Adgangskoderne er ikke ens"
      )
    },
    {
      label: "Telefonnummer:",
      type: "input",
      name: "phone",
      initialValue: "",
      validation: Yup.string()
        .label("Telefonnummer")
        .min(7, "Minimum 7 tal")
        .max(13, "Maximum 13 tal")
        .required("Telefonnummer er påkrævet")
    },
    {
      label: "Eventuelle anmodninger eller kommentar:  (valgfri)",
      type: "textarea",
      name: "comment",
      initialValue: "",
      validation: Yup.string()
    },
    {
      text: "Jeg accepterer OverLooks betingelser",
      type: "checkbox",
      name: "terms",
      initialValue: false,
      value: false,
      validation: Yup.boolean()
        .label("Terms")
        .test(
          "is-true",
          "Du skal acceptere betingelserne",
          value => value === true
        )
    }
  ];

/**
 * 
 * @param {paramter to where it should redirect to, if state.from is not found} to 
 * @param {needs props to try to find location.state.from} prop 
 */
const redirect = (to, prop) => {
  let { location } = prop;
  let path = to;

  if (
    location &&
    location.state &&
    typeof location.state.from !== undefined
  ) {
    path = location.state.from;
  }
  prop.history.push(path);
};

const SignupPage = props => {
  const context = useContext(Context);

  const [errorMessage, setErrorMessage] = useState(null);
  const [signupMutation] = useMutation(signup_mutation);

  return (
    <>
      {errorMessage && <div>{errorMessage}</div>}
      <div className={styles.container}>
        <Form
          handleSubmit={signupMutation}
          onError={setErrorMessage}
          onSuccess={res => {
            context.setToken(res.data.signup.token);
            context.setUser(res.data.signup.token);
          }}
          fields={signupFields}
          submitButton={"Register"}
          redirect={() => redirect("/", props)}
        />
      </div>
    </>
  );
};
export default SignupPage;
