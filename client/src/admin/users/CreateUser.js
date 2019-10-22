import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "react-apollo-hooks";
import * as Yup from "yup";

import Modal from 'components/Modal/Modal';
import Form from 'components/Form/Form';
import { buildEnterTimeline, buildExitTimeline } from './CreateUserTimelines';
import { GET_USERS } from './users';

const CREATE_USER = gql`
  mutation createUser(
    $email: String!
    $firstname: String!
    $lastname: String!
    $password: String!
    $phone: String!
    $role: String
  ) {
    createUser(
      user: {
        email: $email
        firstname: $firstname
        lastname: $lastname
        password: $password
        phone: $phone
        role: $role
      }
    ) {
      firstname
    }
  }
`;

const CreateUser = (props) => {
  const { show, setShow, rect } = props;

  const [errorMessage, setErrorMessage] = useState(null);
  const [createUserMutation] = useMutation(CREATE_USER);

  const enterDuration = 0.6;
  const exitDuration = 0.4;

  const fields = [
    {
      label: "firstname",
      type: "input",
      name: "firstname",
      initialValue: "",
      autofocus: true,
      validation: Yup.string()
        .label("firstname")
        .required("firstname is required")
    },
    {
      label: "lastname",
      type: "input",
      name: "lastname",
      initialValue: "",
      autofocus: true,
      validation: Yup.string()
        .label("lastname")
        .required("lastname is required")
    },
    {
      label: "email",
      type: "email",
      name: "email",
      initialValue: "",
      validation: Yup.string()
        .label("Email")
        .email("Not a valid Email")
        .required("email is required")
    },
    {
      label: "phone",
      type: "input",
      name: "phone",
      initialValue: "",
      validation: Yup.string()
        .label("phone")
        .required("phone is required")
    },
    {
      label: "password",
      type: "input",
      name: "password",
      initialValue: "",
      validation: Yup.string()
        .label("Password")
        .min(3, `Min min char`)
        .max(18, `max max chara`)
        .required("password is required")
    },
    {
      label: "Role",
      type: "select",
      name: "role",
      initialValue: "user",
      options: ["user", "admin", "superhero"],
      validation: Yup.string().required("role is required")
    }
  ];

  return (
    <Modal
      show={show}
      setShow={setShow}
      buildProps={{rect}}
      enterTimeline={buildEnterTimeline}
      exitTimeline={buildExitTimeline}
      enterDuration={enterDuration}
      exitDuration={exitDuration}
      backTo={"/admin/users"}
      overlayOpacity={0.7}
    >
      <div className="create__user">
        <span className="create-button" data-modalcreatebtn>
          CreateUser
        </span>
        {errorMessage && <div className="error">{errorMessage}</div>}
        <Form
          handleSubmit={createUserMutation}
          refetch={GET_USERS}
          onSuccess={result => {
            console.log(`user ${result.data.createUser.firstname} created`);
          }}
          onError={setErrorMessage}
          fields={fields}
          class={"form"}
          submitButton={"Create user"}
          redirect={() => props.history.push("/admin/users")}
        />
      </div>
    </Modal>
  );
}
export default CreateUser