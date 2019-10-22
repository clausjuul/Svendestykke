import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "react-apollo-hooks";
import * as Yup from "yup";

import Modal from 'components/Modal/Modal';
import Form from 'components/Form/Form';
import { GET_USERS } from './users';

const EDIT_USER = gql`
  mutation updateUser(
    $email: String
    $firstname: String
    $lastname: String
    $role: String
    $_id: String
  ) {
    updateUser(
      email: $email
      firstname: $firstname
      lastname: $lastname
      role: $role
      args: { _id: $_id }
    ) {
      fullname
    }
  }
`;

const EditUser = (props) => {
  const { show, setShow, location: { state } } = props;

  if(!state) {
    props.history.push('/admin/users');
  }

  const [errorMessage, setErrorMessage] = useState(null);
  const [updateUserMutation] = useMutation(EDIT_USER);

  const args = { _id: state.user._id };

  const fields = [
    {
      label: "username",
      type: "input",
      name: "username",
      initialValue: state.user.username,
      validation: Yup.string()
        .label("Username")
        .required("username is required")
    },
    {
      label: "email1",
      type: "input",
      name: "email1",
      initialValue: state.user.email,
      validation: Yup.string()
        .label("Email1")
        .email("Not a valid Email1")
        .required("email is required1")
    },
    {
      label: "email2",
      type: "input",
      name: "email2",
      initialValue: state.user.email,
      validation: Yup.string()
        .label("Email2")
        .email("Not a valid Email2")
        .required("email is required2")
    },
    {
      label: "email3",
      type: "input",
      name: "email3",
      initialValue: state.user.email,
      validation: Yup.string()
        .label("Email3")
        .email("Not a valid Email3")
        .required("email is required3")
    },
    {
      label: "email4",
      type: "input",
      name: "email4",
      initialValue: state.user.email,
      validation: Yup.string()
        .label("Email4")
        .email("Not a valid Email4")
        .required("email is required4")
    },
    {
      label: "email5",
      type: "input",
      name: "email5",
      initialValue: state.user.email,
      validation: Yup.string()
        .label("Email5")
        .email("Not a valid Email5")
        .required("email is required5")
    },
    {
      label: "email6",
      type: "input",
      name: "email6",
      initialValue: state.user.email,
      validation: Yup.string()
        .label("Email6")
        .email("Not a valid Email6")
        .required("email is required6")
    },
    {
      label: "role",
      type: "input",
      name: "role",
      initialValue: state.user.role,
      validation: Yup.string().required("role is required")
    }
  ];

  return (
    <Modal show={show} setShow={setShow}>
      <div className="edit__user">
        {errorMessage && <div className="error">{errorMessage}</div>}
        <Form
          title={`Edit user ${state.user.fullname}`}
          handleSubmit={updateUserMutation}
          args={args}
          refetch={GET_USERS}
          onSuccess={() => console.log("user updated")}
          onError={setErrorMessage}
          fields={fields}
          class={"form"}
          submitButton={"Edit user"}
          redirect={() => props.history.push("/admin/users")}
        />
      </div>
    </Modal>
  );
}
export default EditUser